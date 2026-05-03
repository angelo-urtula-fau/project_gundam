import { useState } from 'react'
import { supabase } from '../client';
const CreatePostForm = () => {
    const [post, setPost] = useState({ title: "", content: "", image_url: "" })
    const handleChange = (event) => {
        const { name, value } = event.target
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const createPost = async (event) => {
        await supabase
            .from('posts')
            .insert({
                title: post.title,
                content: post.content,
                image_url: post.image_url
            })
            .select();
        window.location = "/";
    }

    return (
        <div className="create-post-form">
             <h2 className="create-post-header">Create a Post</h2>

            <form onSubmit={createPost}>
                <label htmlFor="title">Title</label> <br />
                <input type="text" required id="title" name="title" onChange={handleChange} /><br />
                <br />
                <label htmlFor="content">content</label><br />
                <textarea rows="5" cols="50" id="content" name="content" onChange={handleChange}></textarea>
                <br />
                <label htmlFor="image_url">Image URL</label><br />
                <input type="text" id="image)_url" name="image_url" onChange={handleChange} />

                <br />
                <button type="submit">Create Post</button>
            </form>
        </div>
    )
}

export default CreatePostForm