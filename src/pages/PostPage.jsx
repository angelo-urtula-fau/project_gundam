import { supabase } from '../client'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CommentBox from '../components/CommentBox'

const PostPage = () => {
    const { id } = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])

    const fetchPost = async () => {
        const { data } = await supabase
            .from("posts")
            .select()
            .eq("id", id)
            .single()
        setPost(data)
    }

    const updateUpvotes = async (event) => {
        event.preventDefault();

        await supabase
            .from("posts")
            .update({ upvotes: post.upvotes + 1 })
            .eq("id", id)
        fetchPost()
    }

    const fetchComments = async () => {
        const { data } = await supabase
            .from("comments")
            .select("*")
            .eq("post_id", id)
        setComments(data)
    }

    useEffect(() => {
        fetchPost()
        fetchComments()
    }, [])

    return (
        <div className="view-post">
            <h1>Title: {post.title}</h1>
            <h3>Content: {post.content}</h3>
            <h3>Image_url: {post.image_url}</h3>
            <button onClick={updateUpvotes}>{post.upvotes} Likes 👍</button>
            <Link to={'/edit/' + post.id} state={{ title: post.title, content: post.content, image_url: post.image_url }}>Edit Your Post</Link>
            {comments && comments.length > 0 ? (
                [...comments]
                    .sort((a, b) => {
                        new Date(b.created_at) - new Date(a.created_at)
                    })
                    .map((comment) => (
                        <h3 key={comment.id}>🗣️{comment.content}</h3>
                    ))) : (<h2>'No comments yet'</h2>)
            } 
            <CommentBox
                post_id={id}
            />
        </div>
    )
}

export default PostPage