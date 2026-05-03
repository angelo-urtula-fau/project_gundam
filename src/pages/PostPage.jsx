import { supabase } from '../client'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const PostPage = () => {
    const { id } = useParams()
    const [post, setPost] = useState({})

    const fetchPost = async () => {
        const { data } = await supabase
            .from("posts")
            .select()
            .eq("id", id)
            .single()
        setPost(data)
    }

    useEffect(() => {
        fetchPost()
    }, [])

    return (
        <div className="view-post">
            <h1>Title: {post.title}</h1>
            <h3>Content: {post.content}</h3>
            <h3>Image_url: {post.image_url}</h3>
            <Link to={'/edit' + post.id} state={{ title: post.title, content: post.content, image_url: post.image_url }}>Edit Your Post</Link>
        </div>
    )
}

export default PostPage