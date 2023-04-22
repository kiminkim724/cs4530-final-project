import { useDispatch } from "react-redux";
import { updateReviewThunk, deleteReviewThunk } from "../services/review-thunks";
import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { getAlbum } from "../services/spotify-service";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faFlag } from "@fortawesome/free-solid-svg-icons";
import { findLikesByReview, likeReview, deleteLike } from "../services/review-service";
import { findUserByUsername, flagUser } from "../services/auth-service";

function Review({ review, editable, show = true, currentUser }) {
    const [rating, setRating] = useState(review.albumRating);
    const [reviewId, setReviewId] = useState(review._id);
    const [reviewUser, setReviewUser] = useState();
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(review.albumReview);
    const [album, setAlbum] = useState();
    const [likes, setLikes] = useState();
    const [isLiked, setIsLiked] = useState(false);
    const [isFlagged, setFlagged] = useState(review.flagged);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEdit = () => {
        setEditing(!editing);
    }

    const fetchReviewUser = async () => {
        const user = await findUserByUsername(review.username);
        setReviewUser(user);
    }

    const fetchAlbum = async () => {
        const album = await getAlbum(review.albumId);
        setAlbum(album);
        if (!likes) {
            await fetchLikes();
        }
    };

    const fetchLikes = async () => {
        const reviewLikes = await findLikesByReview(reviewId);
        setLikes(reviewLikes.length);
        if (currentUser) {
            setIsLiked(reviewLikes.find(like => like.username === currentUser.username) !== undefined);
        }
    };

    useEffect(() => {
        if (currentUser) {
            fetchLikes();
        }
    }, [currentUser])


    useEffect(() => {
        if (!album) {
            fetchAlbum();
        }
        fetchReviewUser();
    }, []);

    useEffect(() => {
        setFlagged(review.flagged)
    }, [review.flagged]);

    return (
        <Row className="mt-4 mx-2 pt-2 review-item">
            <Col xs={2} className="text-center">
                {show &&
                    <>
                        <Link to={`/spotify/album/${review.albumId}`}>
                            <img
                                src={album ? album.images[0].url : ""}
                                className='ms-2 img-fluid'
                            />
                        </Link>
                        <div className="fw-bold result-title">
                            {album ? album.name : ""}
                        </div>
                        <div>
                            {album ? album.artists[0].name : ""}
                        </div>
                    </>
                }
            </Col>
            <Col xs={show ? 10 : 12}>
                <Row className="h-50 m-1">
                    <li key={review._id} style={{ 'list-style-type': 'none' }}>
                        {editable && editing ? (
                            <>
                                <div className="review-other-size">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <span
                                            key={value}
                                            onClick={() => setRating(value)}
                                            style={{ color: value <= rating ? 'gold' : 'gray', cursor: 'pointer' }}
                                        >
                                            ★
                                        </span>
                                    ))}

                                </div>
                                <div>
                                    <textarea
                                        className="form-control w-100 mb-2"
                                        style={{ height: "100px" }}
                                        onChange={(e) => setText(e.target.value)}
                                        type="text"
                                        value={text}
                                    />
                                    <button
                                        className="btn btn-danger float-end ms-2"
                                        onClick={() => dispatch(deleteReviewThunk(review._id))}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="btn btn-warning float-end"
                                        onClick={() => {
                                            dispatch(
                                                updateReviewThunk({ ...review, albumRating: rating, albumReview: text })
                                            );
                                            changeEdit();
                                        }}
                                    >
                                        Save
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <span
                                            key={value}
                                            style={{ color: value <= rating ? 'gold' : 'gray', cursor: 'pointer' }}
                                        >
                                            ★
                                        </span>
                                    ))}
                                    <span className="ms-1 review-other-size">
                                        -
                                        <Link className="ms-1" to={`/profile/${review.username}`}>
                                            {review.username}
                                        </Link>
                                    </span>
                                    <FontAwesomeIcon onClick={() => {
                                        if (currentUser) {
                                            if (!isFlagged) {
                                                dispatch(
                                                    updateReviewThunk({ ...review, flagged: true })
                                                );
                                                flagUser(reviewUser, 1)
                                                setFlagged(true);
                                            } else if (currentUser.isAdmin) {
                                                dispatch(
                                                    updateReviewThunk({ ...review, flagged: false })
                                                );
                                                flagUser(reviewUser, -1)
                                                setFlagged(false);
                                            }
                                        } else {
                                            alert("Please login/register to flag reviews");
                                        }
                                    }}
                                        className="fa-lg mt-auto float-end"
                                        icon={faFlag}
                                        style={{ color: isFlagged ? '#FF0000' : 'black' }} />
                                </div>
                                <div>
                                    <div>
                                        <label className="review-text">{text}</label>
                                    </div>
                                </div>
                            </>
                        )
                        }
                    </li >
                </Row>
                <Row className="align-items-end h-50 m-auto">
                    <Col className="mb-3">
                        <FontAwesomeIcon onClick={() => {
                            if (currentUser) {
                                if (isLiked) {
                                    deleteLike(review._id);
                                    setLikes(likes - 1);
                                    setIsLiked(false);
                                } else {
                                    likeReview(review._id)
                                    setLikes(likes + 1);
                                    setIsLiked(true);
                                }
                            } else {
                                alert("Please login/register to upvote reviews");
                                navigate("/login")
                            }
                        }}
                            className="fa-xl"
                            icon={faThumbsUp}
                            style={{ color: isLiked ? '#0000FF' : 'black' }} />
                        <span className="ms-2 review-other-size">{likes}</span>
                    </Col>
                    <Col className="float-end mb-3">
                        {editable && !editing && 
                            < button
                                className="btn btn-warning float-end"
                                onClick={() => {
                                    changeEdit();
                                }}
                            >
                                Edit
                            </button>
                        }
                    </Col>
                </Row>
            </Col>
        </Row >
    );
}

export default Review;