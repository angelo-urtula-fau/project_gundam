import { useState } from "react"
import { supabase } from '../client';
const CommentBox = (props) => {
    const [comment, setComment] = useState({ content: "", post_id: props.post_id })
    const handleChange = (event) => {
        const { name, value } = event.target
        setComment((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const createComment = async (event) => {
        await supabase
            .from('comments')
            .insert({
                content: comment.content,
                post_id: comment.post_id
            })
            .select();
        window.location = '/view/' + comment.post_id;
    }
    console.log(comment.post_id)

    return (
        <div>
            <form>
                <label htmlFor="content">Leave a comment..</label> <br />
                <input type="text" id="content" name="content" value={comment.content} onChange={handleChange} /><br />
                <br />
                <input type="submit" value="Submit" onClick={createComment} />
            </form>
        </div>
    )
}

export default CommentBox