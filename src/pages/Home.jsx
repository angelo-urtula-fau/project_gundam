import { useState, useEffect } from 'react'
import { supabase } from '../client'
import PostCard from '../components/PostCard'

const Home = () => {
    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        const { data,error } = await supabase
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
            {posts && posts.length > 0 ? (
                [...posts]
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
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