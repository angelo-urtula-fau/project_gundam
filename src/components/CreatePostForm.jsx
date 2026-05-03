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
        <div>
            <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br />
                <label htmlFor="content">content</label><br />
                <textarea rows="5" cols="50" id="content" name="content" onChange={handleChange}></textarea>
                <br />
                <label htmlFor="image_url">Image URL</label><br />
                <input type="text" id="image)_url" name="image_url" onChange={handleChange} />

                <br />
                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreatePostForm