import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Review from "../components/review";
import { findUsersByFlaggedThunk } from "../services/auth-thunks";
import { findReviewIfFlaggedThunk } from "../services/review-thunks";
import { Link, useNavigate } from "react-router-dom";
function AdminScreen() {
    const { reviews, loading } = useSelector((state) => state.reviews);
    const { currentUser, flaggedUsers } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser && !currentUser.isAdmin) {
            alert("Unauthorized access");
            navigate("/");
        }
        dispatch(findReviewIfFlaggedThunk())
        dispatch(findUsersByFlaggedThunk())
    }, []);

    useEffect(() => {
        console.log(flaggedUsers)
        console.log(reviews)

    }, [flaggedUsers, reviews])

    return (
        <div className="container">
            <h1 className="text-center">Flagged Users</h1>
            <ol className="list-group mt-2">
                {
                    flaggedUsers.map((user) => (
                        <Link to={`/profile/${user.username}`}>
                            <h1>
                                {user.username} - Flags: {user.flags}
                            </h1>
                        </Link>
                    ))
                }
            </ol>
            <h1 className="text-center">Flagged Reviews</h1>
            <ul className="list-group mt-2">
                {loading ? <h1 className="text-center">Loading</h1>
                    :
                    reviews.map((review) => (
                        <Review key={review._id} review={review} editable={true} currentUser={currentUser} />
                    ))
                }
            </ul>
        </div>
    );
}

export default AdminScreen;