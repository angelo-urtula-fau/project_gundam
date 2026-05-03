import { useState, useEffect } from 'react'
import { supabase } from '../client'
import PostCard from '../components/PostCard'

const Home = (props) => {
    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        const { data } = await supabase
            .from("posts")
            .select()
        setPosts(data)
    }

    useEffect(() => {
        fetchPosts()
    }, [props])

    return (
        <div className="Home">
            {posts && posts.length > 0 ?
                [...posts]
                    .sort((a, b) => b.id - a.id)
                    .map((post, index) =>
                        <PostCard
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            time={post.created_at}
                            upvotes={post.upvotes}

                        />
                    ) : <h2>{'No posts yet'}</h2>
            }
        </div>
    )
}

export default Home