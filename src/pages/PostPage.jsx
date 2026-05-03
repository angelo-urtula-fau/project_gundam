import { supabase } from '../client'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CommentBox from '../components/CommentBox'
import { useAuth } from '../context/AuthContext'
import SummaryCard from '../components/SummaryCard'

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
    }, [id])

    return (
        <div className="view-post">
            <h1>{post.title}</h1>
            <h3>Content: {post.content}</h3>
            <img src={post.image_url} alt={post.title} />
            <button onClick={updateUpvotes}>{post.upvotes} Likes 👍</button>
            {user?.id === post.user_id ? (<Link to={'/edit/' + post.id} state={{ title: post.title, content: post.content, image_url: post.image_url, user_id: post.user_id }}><button>Edit Your Post</button></Link>) : (null)}
            {comments && comments.length > 0 ? (
                [...comments]
                    .sort((a, b) => {
                        new Date(b.created_at) - new Date(a.created_at)
                    })
                    .map((comment) => (
                        <h3 key={comment.id}>🗣️{comment.content}</h3>
                    ))) : (<h2>'No comments yet'</h2>)
            }
            {user ? (<CommentBox
                post_id={id}
                onCommentAdded={fetchComments}
            />) : (null)}
            <SummaryCard post={post} comments={comments} />
        </div>
    )
}

export default PostPage