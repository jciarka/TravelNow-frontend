import React from 'react'
import { useState, useEffect } from "react";
import CommentBubble from './CommentBubble'
import { useAuthInfo } from '../context/AuthContextProvider'

const HotelComments = ({hotelId}) => {

    const authInfo = useAuthInfo()

    const [newComment, setNewComment] = useState({
        id: -1, //default
        text: "",
        rating: 0,
        hotelsId: hotelId
    })

    const [comments, setComments] = useState([])

    const getComments = async () => {
        fetch(`/api/comments/${hotelId}`)
            .then(response => response.json())
            .then(data => {
                setComments(data)
            }) 
        }

    const postComment = async () => {
        console.log(`posting ${newComment}`)
        fetch("/api/comments",
             {
               method: 'PUT',
               headers: {
                   "Content-type": 'application/json',
                   "Authorization": `Bearer ${authInfo.bearer}`
                },
               body: JSON.stringify(newComment)
             })
             .then(response => {
                if (!response.ok)
                {
                    if(response.status === 401)
                    {
                        throw Error("Log in before posting comment");
                    } else {
                        throw Error("Unknown server error, try again later");                 
                    }
                }
                return response
             })
             .then(response => response.json())
             .then(data => {
                console.log(`recieved ${data}`)
                setComments([data, ...comments])
             })
    }

    useEffect(() => {
        getComments()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="row justify-content-center m-0 p-0 mb-4">
            <div className="col-lg-10 p-2 m-0">
                <div className="card rounded-0 shadow-sm p-3 bg-light">
                    <div className="card-body w-75 m-auto">

                        <form onSubmit={ (e) => {
                                e.preventDefault()
                                postComment()
                            }
                        }>
                            <div className="text-center">
                                <h5 className="card-title">Did you visited this hotel?</h5>
                                <p>Share your opinion with others</p>
                            </div>
  
                            <div className="mt-4 d-flex justify-content-between">
                                <div>
                                    <label className="float-left">Share your experience</label>
                                </div>    
                                <div className="rating text-center">
                                    <input type="radio" name="star" id="star1" value="1"
                                            checked={newComment.rating === 5 ? 'checked' : ''} 
                                            onChange={(e) => setNewComment({...newComment, rating: 5})}/>
                                    <label htmlFor="star1"></label>

                                    <input type="radio" name="star" id="star2" value="2"
                                            checked={newComment.rating === 4 ? 'checked' : ''} 
                                            onChange={(e) => setNewComment({...newComment, rating: 4})}/>
                                    <label htmlFor="star2"></label>
                                    
                                    <input type="radio" name="star" id="star3" value="3"
                                            checked={newComment.rating === 3 ? 'checked' : ''} 
                                            onChange={(e) => setNewComment({...newComment, rating: 3})}/>
                                    <label htmlFor="star3"></label>
                                    
                                    <input type="radio" name="star" id="star4" value="4"
                                            checked={newComment.rating === 2 ? 'checked' : ''} 
                                            onChange={(e) => setNewComment({...newComment, rating: 2})}/>
                                    <label htmlFor="star4"></label>
                                    
                                    <input type="radio" name="star" id="star5" value="5"
                                            checked={newComment.rating === 1 ? 'checked' : ''} 
                                            onChange={(e) => setNewComment({...newComment, rating: 1})}/>
                                    <label htmlFor="star5"></label>
                                </div>
                            </div>

                            <textarea className="w-100" style={{height: "150px", resize: "none"}}
                                placeholder={authInfo.isLoggedIn === false ? "Log in to post a comment" : ""}
                                value={newComment.text} 
                                onChange={(e) => setNewComment({...newComment, text: e.target.value})}>
                            </textarea>

                            <button type="submit" className="rounded-0 btn btn-primary btn-lg w-100 m-auto"
                                    disabled={authInfo.isLoggedIn === false}>Wyślij</button>
                        </form>
                    </div>

                    {
                        comments.length !== 0 &&

                        <div className="comment-section">

                            <div className="text-center">
                                <h5 className="card-title">Check out peoples feelings aboyt this place</h5>
                            </div>

                            {
                                comments.map((comment, index) => 
                                    <CommentBubble key={index} comment={comment} /> 
                                )
                            }
                        </div>  
                    }
                </div>
            </div>
        </div>
        
    )
}

export default HotelComments
