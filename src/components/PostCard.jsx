import {useState} from 'react'
import {supabase} from '../client'
import {Link} from 'react-router'

const PostCard = (props) => {
    return(
        <div className="PostCard">
            <h1>Title: {props.title}</h1>
            <h3>Posted at: {props.time}</h3>
            <h3>Upvotes: {props.upvotes}</h3>
        </div>
    )
}

export default PostCard