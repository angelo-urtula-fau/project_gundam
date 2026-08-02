import { useState } from 'react'
import { supabase } from '../client'
import { useAuth } from '../context/AuthContext'

const CreatePostForm = () => {
    const { user } = useAuth()
    const [post, setPost] = useState({
        gunpla_name: "",
        model_number: "",
        grade: "HG",
        purchase_price: "",
        build_status: "Backlog",
        rating: 3,
        review_text: "",
        image_url: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setPost((prev) => ({ ...prev, [name]: value }))
    }

    const createPost = async (event) => {
        event.preventDefault()
        await supabase
            .from('posts')
            .insert({
                user_id: user.id,
                gunpla_name: post.gunpla_name,
                model_number: post.model_number,
                grade: post.grade,
                purchase_price: parseFloat(post.purchase_price) || null,
                build_status: post.build_status,
                rating: parseInt(post.rating),
                review_text: post.review_text,
                image_url: post.image_url
            })
            .select()
        window.location = "/"
    }

    return (
        <div className="create-post-form">
            <h2 className="create-post-header">Add a Kit</h2>
            <form onSubmit={createPost}>
                <label htmlFor="gunpla_name">Gunpla Name</label><br />
                <input type="text" required id="gunpla_name" name="gunpla_name" onChange={handleChange} /><br /><br />

                <label htmlFor="model_number">Model Number</label><br />
                <input type="text" id="model_number" name="model_number" onChange={handleChange} /><br /><br />

                <label htmlFor="grade">Grade</label><br />
                <select id="grade" name="grade" value={post.grade} onChange={handleChange}>
                    <option value="SD">SD</option>
                    <option value="HG">HG</option>
                    <option value="MG">MG</option>
                    <option value="PG">PG</option>
                </select><br /><br />

                <label htmlFor="purchase_price">Purchase Price ($)</label><br />
                <input type="number" step="0.01" min="0" id="purchase_price" name="purchase_price" onChange={handleChange} /><br /><br />

                <label htmlFor="build_status">Build Status</label><br />
                <select id="build_status" name="build_status" value={post.build_status} onChange={handleChange}>
                    <option value="Backlog">Backlog</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Completed">Completed</option>
                </select><br /><br />

                <label htmlFor="rating">Rating (1–5)</label><br />
                <input type="number" min="1" max="5" id="rating" name="rating" value={post.rating} onChange={handleChange} /><br /><br />

                <label htmlFor="review_text">Review</label><br />
                <textarea rows="5" cols="50" id="review_text" name="review_text" onChange={handleChange}></textarea><br /><br />

                <label htmlFor="image_url">Image URL</label><br />
                <input type="text" id="image_url" name="image_url" onChange={handleChange} /><br /><br />

                <button type="submit">Add Kit</button>
            </form>
        </div>
    )
}

export default CreatePostForm
