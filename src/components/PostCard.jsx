const PostCard = (props) => {
    return (
        <div className="PostCard">
            <h1>{props.gunpla_name}</h1>
            <h3>{props.grade} · {props.build_status}</h3>
            <h3>Rating: {props.rating}/5</h3>
            <h3>Posted: {props.time}</h3>
        </div>
    )
}

export default PostCard
