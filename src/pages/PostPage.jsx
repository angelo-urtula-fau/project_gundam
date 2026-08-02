import { supabase } from '../client'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CommentBox from '../components/CommentBox'
import { useAuth } from '../context/AuthContext'

const PostPage = () => {
    const { user } = useAuth()
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
    }, [id])

    return (
        <div className="view-post">
            <h1>{post.gunpla_name}</h1>
            <h3>{post.grade} · {post.model_number}</h3>
            <h3>Build Status: {post.build_status}</h3>
            <h3>Rating: {post.rating}/5</h3>
            {post.purchase_price != null && <h3>Purchase Price: ${post.purchase_price}</h3>}
            {post.review_text && <p>{post.review_text}</p>}
            {post.image_url && <img src={post.image_url} alt={post.gunpla_name} />}
            {user?.id === post.user_id && (
                <Link to={'/edit/' + post.id} state={{
                    gunpla_name: post.gunpla_name,
                    model_number: post.model_number,
                    grade: post.grade,
                    purchase_price: post.purchase_price,
                    build_status: post.build_status,
                    rating: post.rating,
                    review_text: post.review_text,
                    image_url: post.image_url,
                    user_id: post.user_id
                }}>
                    <button>Edit Your Post</button>
                </Link>
            )}
            {comments && comments.length > 0 ? (
                [...comments]
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .map((comment) => (
                        <h3 key={comment.id}>🗣️{comment.content}</h3>
                    ))
            ) : (
                <h2>No comments yet</h2>
            )}
            {user && <CommentBox post_id={id} onCommentAdded={fetchComments} />}
        </div>
    )
}

export default PostPage
