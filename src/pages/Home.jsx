import { useState, useEffect } from 'react'
import { supabase } from '../client'
import PostCard from '../components/PostCard'
import CreatePostForm from '../components/CreatePostForm'
import { Link } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"
import { format } from 'date-fns';

const Home = () => {
    const { user } = useAuth()
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
                placeholder="Search kits..."
                value={searching}
                onChange={(e) => setSearching(e.target.value)}
                className="search-bar"
            />
            <div className="sorter">
                <p>Sort by:</p>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="time">Newest</option>
                    <option value="rating">Highest Rated</option>
                </select>
            </div>

            {posts && posts.length > 0 ? (
                [...posts]
                    .filter((post) =>
                        post.gunpla_name.toLowerCase().includes(searching.toLowerCase()))
                    .sort((a, b) => {
                        if (sortBy === "time") {
                            return new Date(b.created_at) - new Date(a.created_at)
                        }
                        return b.rating - a.rating
                    })
                    .map((post) => (
                        <Link key={post.id} to={'view/' + post.id} className="post-link">
                            <PostCard
                                id={post.id}
                                gunpla_name={post.gunpla_name}
                                grade={post.grade}
                                build_status={post.build_status}
                                rating={post.rating}
                                time={format(new Date(post.created_at), 'MM/dd/yyyy hh:mm:ss a')}
                            />
                        </Link>
                    ))
            ) : (<h2>No posts yet</h2>)
            }
        </div>
    )
}

export default Home
