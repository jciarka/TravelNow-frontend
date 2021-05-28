import React from 'react'

const CommentBubble = ({comment}) => {

    const printStars = (rating) => {
        const stars = []
        for (var i=0; i < rating; i++) {
            stars.push(<i key={i} className="fa fa-star" aria-hidden="true"></i>)
        }
        return stars
    }

    return (
    <div className="comment-bubble">
        <div className="d-flex comment-bubble-header">
            <label>
                <strong>{comment.authorUserName}</strong>
            </label>
            
            <label>{printStars(comment.rating)}</label>
            
            <label>{comment.postDate}</label>
        </div>

        <div className="comment-bubble-content">
            { comment.text }
        </div>
    </div>
    )
}

export default CommentBubble
