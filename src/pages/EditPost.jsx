import { useState } from 'react'
import { useParams, useLocation } from "react-router-dom"
import { supabase } from '../client'
import { useAuth } from '../context/AuthContext'

const EditPost = () => {
    const { user } = useAuth()
    const { id } = useParams()
    const location = useLocation()
    const postdata = location.state
    const [post, setPost] = useState({
        gunpla_name: postdata.gunpla_name,
        model_number: postdata.model_number || "",
        grade: postdata.grade,
        purchase_price: postdata.purchase_price || "",
        build_status: postdata.build_status,
        rating: postdata.rating,
        review_text: postdata.review_text || "",
        image_url: postdata.image_url || ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setPost((prev) => ({ ...prev, [name]: value }))
    }

    const updatePost = async (event) => {
        event.preventDefault()
        await supabase
            .from("posts")
            .update({
                gunpla_name: post.gunpla_name,
                model_number: post.model_number,
                grade: post.grade,
                purchase_price: parseFloat(post.purchase_price) || null,
                build_status: post.build_status,
                rating: parseInt(post.rating),
                review_text: post.review_text,
                image_url: post.image_url
            })
            .eq("id", id)
        window.location = "/view/" + id
    }

    const deletePost = async (event) => {
        event.preventDefault()
        await supabase.from('posts').delete().eq('id', id)
        window.location = "/"
    }

    return (
        <div>
            {postdata.user_id === user?.id ? (
                <div>
                    <form>
                        <h1>Edit Your Post</h1>

                        <label htmlFor="gunpla_name">Gunpla Name</label><br />
                        <input type="text" id="gunpla_name" name="gunpla_name" value={post.gunpla_name} onChange={handleChange} /><br /><br />

                        <label htmlFor="model_number">Model Number</label><br />
                        <input type="text" id="model_number" name="model_number" value={post.model_number} onChange={handleChange} /><br /><br />

                        <label htmlFor="grade">Grade</label><br />
                        <select id="grade" name="grade" value={post.grade} onChange={handleChange}>
                            <option value="SD">SD</option>
                            <option value="HG">HG</option>
                            <option value="MG">MG</option>
                            <option value="PG">PG</option>
                        </select><br /><br />

                        <label htmlFor="purchase_price">Purchase Price ($)</label><br />
                        <input type="number" step="0.01" min="0" id="purchase_price" name="purchase_price" value={post.purchase_price} onChange={handleChange} /><br /><br />

                        <label htmlFor="build_status">Build Status</label><br />
                        <select id="build_status" name="build_status" value={post.build_status} onChange={handleChange}>
                            <option value="Backlog">Backlog</option>
                            <option value="In-Progress">In-Progress</option>
                            <option value="Completed">Completed</option>
                        </select><br /><br />

                        <label htmlFor="rating">Rating (1–5)</label><br />
                        <input type="number" min="1" max="5" id="rating" name="rating" value={post.rating} onChange={handleChange} /><br /><br />

                        <label htmlFor="review_text">Review</label><br />
                        <textarea rows={10} cols={50} id="review_text" name="review_text" value={post.review_text} onChange={handleChange} /><br /><br />

                        <label htmlFor="image_url">Image URL</label><br />
                        <input type="text" id="image_url" name="image_url" value={post.image_url} onChange={handleChange} /><br /><br />

                        <input type="submit" value="Save Changes" onClick={updatePost} />
                        <button className="deleteButton" onClick={deletePost}>Delete</button>
                    </form>
                </div>
            ) : (
                <p>You are not the owner of this post.</p>
            )}
        </div>
    )
}

export default EditPost
