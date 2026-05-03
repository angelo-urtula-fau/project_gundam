import { useState, useEffect } from 'react'
import { supabase } from '../client'
import PostCard from '../components/PostCard'
import CreatePostForm from '../components/CreatePostForm'

const Home = () => {
    const [posts, setPosts] = useState([])
    const [sortBy, setSortBy] = useState("time")

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
            <CreatePostForm />
            <button onClick={() => setSortBy(sortBy === "time" ? "upvotes" : "time")}>
                Sort by: {sortBy === "time" ? "Upvotes" : "Newest"}
            </button>
            {posts && posts.length > 0 ? (
                [...posts]
                    .sort((a, b) => {
                        if (sortBy === "time") {
                            return new Date(b.created_at) - new Date(a.created_at)
                        }
                        return b.upvotes - a.upvotes
                    })

                    .map((post) => (
                        <PostCard
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            time={post.created_at}
                            upvotes={post.upvotes}

                        />
                    ))) : (<h2>'No posts yet'</h2>)
            }
        </div>
    )
}

export default Home