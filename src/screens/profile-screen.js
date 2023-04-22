import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { profileThunk, logoutThunk, updateUserThunk, findUserByUsernameThunk }
    from "../services/auth-thunks";
import Review from "../components/review";
import { findReviewByUserThunk } from "../services/review-thunks";
import { findFollowersThunk, findFollowingThunk, followThunk, unfollowThunk } from "../services/follow-thunks";
import { Button, Col, Row } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteUser } from "../services/auth-service";

function ProfileScreen() {
    const { username } = useParams();
    const { currentUser } = useSelector((state) => state.user);
    const { reviews, loading } = useSelector((state) => state.reviews);
    const { followers, following } = useSelector((state) => state.follows);
    const [profile, setProfile] = useState(currentUser);
    const [show, setShow] = useState(false);
    const [showList, setShowList] = useState([]);
    const [type, setType] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClose = () => setShow(false);
    const handleShow = (type) => {
        setShow(true);
        setType(type);
        type === 'Followers' ? setShowList(followers) : setShowList(following);
    };

    const getProfile = async () => {
        // const profile = await userService.profile();
        const action = await dispatch(profileThunk());
        console.log(action)
        if (!action.payload) {
            navigate("/login");
            alert("Login or Register to view your account");
        } else {
            setProfile(action.payload);
            await getFollows(action.payload._id);
            await fetchReviews(action.payload.username);
        }
    };

    const getFollows = async (id) => {
        const action1 = await dispatch(findFollowersThunk(id));
        console.log(action1.payload);
        const action2 = await dispatch(findFollowingThunk(id));
        console.log(action2.payload);
    }

    const fetchReviews = async (name) => {
        dispatch(findReviewByUserThunk(name));
    }

    const save = async () => {
        const action = await dispatch(updateUserThunk(profile));
        console.log(action)
        setProfile(action.payload);
    };

    const getUserByUsername = async () => {
        const action = await dispatch(findUserByUsernameThunk(username));

        if (!action.payload) {
            alert("User doesn't exist")
            navigate("/");
        } else {
            setProfile(action.payload);
            await getFollows(action.payload._id);
            await fetchReviews(action.payload.username);
        }
    };

    const logout = async () => {
        // await userService.logout();
        await dispatch(logoutThunk());
        navigate("/login");
    };

    const followUser = async () => {
        if (currentUser) {
            const follow = { follower: currentUser, following: profile }
            console.log(follow);
            const action = await dispatch(followThunk(follow));
            console.log(action);
        }
    }
    const unfollowUser = async () => {
        if (currentUser) {
            const follow = { follower: currentUser, following: profile }
            console.log(follow);
            const action = await dispatch(unfollowThunk(follow));
            console.log(action);
        }
    }

    const isCorrectUser = username === undefined || (currentUser ? currentUser.username === username : false);
    useEffect(() => {
        if (username) {
            getUserByUsername();
        } else {
            getProfile();
        }
        console.log(followers, following)
    }, []);

    useEffect(() => {
    }, [followers, following])

    useEffect(() => {
        if (username)
            getUserByUsername();
    }, [username])

    return (
        <div>
            <Row>
                <Col xs={10}>
                    <h1>
                        {username ? username + "'s" : ""} Profile
                    </h1>
                </Col>
                <Col xs={1}>
                    {currentUser && username && currentUser.username !== username &&
                        (followers && followers.find(user => user === currentUser.username) ?
                            (
                                <Button
                                    onClick={unfollowUser}
                                    className="btn btn-warning"
                                >
                                    Unfollow
                                </Button>
                            )
                            :
                            (
                                <Button
                                    onClick={followUser}
                                    className="btn btn-warning"
                                >
                                    Follow
                                </Button>
                            )
                        )
                    }
                </Col>
                <Col xs={1}></Col>
            </Row>
            <Row className="align-items-center">
                <Col xs={6}>
                    {profile && (
                        <div>
                            <label>Username</label>
                            {isCorrectUser && (
                                <input
                                    type="text"
                                    className="form-control"
                                    value={profile.username}
                                    onChange={(e) =>
                                        setProfile({ ...profile, username: e.target.value })
                                    }
                                />
                            )}
                            {!isCorrectUser && <p>{profile.username}</p>}
                            <label>First Name</label>
                            {isCorrectUser && (
                                <input
                                    type="text"
                                    className="form-control"
                                    value={profile.firstName}
                                    onChange={(e) =>
                                        setProfile({ ...profile, firstName: e.target.value })
                                    }
                                />
                            )}
                            {!isCorrectUser && <p>{profile.firstName}</p>}
                            {isCorrectUser && (
                                <>
                                    <label>Password</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={profile.password}
                                        onChange={(e) =>
                                            setProfile({ ...profile, password: e.target.value })
                                        }
                                    />
                                </>
                            )}
                        </div>
                    )}
                    {isCorrectUser && (
                        <div className="mt-2">
                            <button onClick={() => logout()} className="btn btn-danger">
                                Logout
                            </button>
                            <button className="btn btn-primary" onClick={save}>Save</button>
                        </div>
                    )}
                    {currentUser && currentUser.isAdmin && profile && profile.flags >= 5 && (
                        <div className="mt-2">
                            <button onClick={() => {
                                deleteUser(profile._id)
                                navigate("/")
                            }} className="btn btn-danger">
                                Delete
                            </button>
                        </div>
                    )}
                </Col>
                <Col xs={1}></Col>
                <Col>
                    <Row className="m-3">
                        <Button onClick={() => handleShow('Followers')}>View Followers</Button>
                    </Row>
                    <Row className="m-3">
                        <Button onClick={() => handleShow('Following')}>View Following</Button>
                    </Row>
                </Col>
                <Col xs={1}></Col>
            </Row>
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="ms-2">{type}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className="list-group">
                        {showList.map((user) => (
                            <li key={user} className="list-group-item">
                                <Row className="align-items-center">
                                    <Col>
                                        <div className="fw-bold">
                                            <Link onClick={handleClose} to={`/profile/${user}`}>
                                                {user}
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <h2 className="text-center mt-2">User Reviews</h2>
            {
                loading ?
                    <h1>Loading...</h1>
                    :
                    <ul className="list-group my-2">
                        {reviews.map((review) => (
                            <Review key={review._id} review={review} editable={currentUser && currentUser.username === review.username} show={true}
                                currentUser={currentUser} />
                        ))
                        }
                    </ul>

            }
        </div>
    );

}
export default ProfileScreen;