import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Review from "../components/review";
import { findAllReviewsThunk, findReviewByFollowingThunk } from "../services/review-thunks";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
function Home() {
    const { reviews, loading } = useSelector((state) => state.reviews);
    const { currentUser } = useSelector((state) => state.user);
    const [forYou, setForYou] = useState(false);
    const dispatch = useDispatch();

    const changeReviews = async () => {
        if (forYou) {
            setForYou(false);
            dispatch(findAllReviewsThunk())
        } else {
            setForYou(true);
            dispatch(findReviewByFollowingThunk(currentUser._id));
        }
    }

    useEffect(() => {
        if (currentUser) {
            setForYou(true);
            dispatch(findReviewByFollowingThunk(currentUser._id));
        } else {
            dispatch(findAllReviewsThunk())
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            setForYou(true);
            dispatch(findReviewByFollowingThunk(currentUser._id));
        }
    }, [currentUser]);


    return (
        <div className="container my-2">
            <Row className="align-items-center">
                <Col xs={11}>
                    {!forYou ?
                        <h1 className="text-center">Latest Spotify Reviews</h1>
                        :
                        <h1 className="text-center">Latest Reviews by the People you follow</h1>
                    }
                </Col>
                {currentUser && <Col xs={1}>
                    <FontAwesomeIcon size="lg" icon={faStar} color="blue" onClick={changeReviews} />
                </Col>
                }
            </Row>
            <ul className="list-group mt-2">
                {loading ? <h1 className="text-center">Loading</h1>
                    :
                    reviews.map((review) => (
                        <Review key={review._id} review={review} editable={currentUser && currentUser.username === review.username} currentUser={currentUser} />
                    ))
                }
            </ul>
        </div>
    );
}

export default Home;