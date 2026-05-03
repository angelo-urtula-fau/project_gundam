import { useState, useEffect } from 'react'
import { supabase } from '../client'
import PostCard from '../components/PostCard'
import CreatePostForm from '../components/CreatePostForm'
import { Link } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"

const Home = () => {
    const { user, loading } = useAuth()
    const [posts, setPosts] = useState([])
    const [sortBy, setSortBy] = useState("time")
    const [searching, setSearching] = useState("")

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from("posts")
            .select("*")
        console.log(error)
        setPosts(data)
    }

    useEffect(() => {
        fetchPosts()
    }, [])


    return (
        <div className="Home">
            {user ? (<CreatePostForm />) : (null)}
            <input
                type="text"
                placeholder="Search 🔍..."
                value={searching}
                onChange={(e) => setSearching(e.target.value)}
                className="search-bar"
            />
            <div className="sorter">
                <p>Sort by:</p>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="time">Newest</option>
                <option value="upvotes">Most Upvoted</option>
            </select>
            </div>


            {posts && posts.length > 0 ? (
                [...posts]
                    .filter((post) =>
                        post.title.toLowerCase().includes(searching.toLowerCase()))
                    .sort((a, b) => {
                        if (sortBy === "time") {
                            return new Date(b.created_at) - new Date(a.created_at)
                        }
                        return b.upvotes - a.upvotes
                    })

                    .map((post) => (
                        <Link key={post.id} to={'view/' + post.id} className="post-link">
                            <PostCard
                                id={post.id}
                                title={post.title}
                                time={post.created_at}
                                upvotes={post.upvotes}

                            /></Link>
                    ))) : (<h2>'No posts yet'</h2>)
            }
        </div>
    )
}

export default Home