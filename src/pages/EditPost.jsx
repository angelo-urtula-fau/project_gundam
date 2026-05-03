import { useState } from 'react'
import { useParams, useLocation } from "react-router-dom"
import { supabase } from '../client';
import { useAuth } from '../context/AuthContext';

const EditPost = ({ data }) => {
    const { user } = useAuth()
    const { id } = useParams()
    const location = useLocation()
    const postdata = location.state
    const [post, setPost] = useState({ id: null, title: postdata.title, content: postdata.content, image_url: postdata.image_url })

    const updatePost = async (event) => {
        event.preventDefault();

        await supabase
            .from("posts")
            .update({ title: post.title, content: post.content, image_url: post.image_url })
            .eq("id", id)
        window.location = "/view/" + id;
    }

    const deletePost = async (event) => {
        event.preventDefault();

        await supabase
            .from('posts')
            .delete()
            .eq('id', id);

        window.location = "/";
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }
    return (
        <div>
            {postdata.user_id === user?.id ? (
                <div>
                    <form>
                        <h1>Edit Your Post</h1>
                        <label htmlFor="title">Title</label> <br />
                        <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                        <br />
                        <label htmlFor="title">Content</label> <br />
                        <input type="text" id="content" name="content" value={post.content} onChange={handleChange} /><br />
                        <br />
                        <label htmlFor="title">Image URL</label> <br />
                        <input type="text" id="image_url" name="image_url" value={post.image_url} onChange={handleChange} /><br />
                        <br />
                        <input type="submit" value="Submit" onClick={updatePost} />
                        <button className="deleteButton" onClick={deletePost}>Delete</button>
                    </form>
                </div>
            ) : (<p>You are not the owner of this post.</p>)

            }</div>
    )
}
export default EditPost