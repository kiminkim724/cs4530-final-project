import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAlbum } from "../../services/spotify-service";
import { Card, Row, Col, Button, Modal } from "react-bootstrap";
import { updateUserThunk } from "../../services/auth-thunks";
import { createReviewThunk, findReviewByAlbumThunk } from "../../services/review-thunks";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Review from "../../components/review";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SpotifyAlbumScreen({ query }) {
    const { currentUser } = useSelector((state) => state.user);
    const { reviews, error, loading } = useSelector((state) => state.reviews);
    const { id } = useParams();

    const [album, setAlbum] = useState();
    const [newReview, setNewReview] = useState({
        albumReview: "",
        albumId: id
    });
    const [rating, setRating] = useState(0);
    const [tracks, setTracks] = useState([]);
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const fetchReviews = async () => {
        const action = await dispatch(findReviewByAlbumThunk(id));
        console.log(action);
    }
    const fetchAlbum = async () => {
        const album = await getAlbum(id);
        setAlbum(album);
        setTracks(album.tracks.items);
    };
    useEffect(() => {
        fetchAlbum();
        fetchReviews();
    }, []);

    if (album) {
        return (
            <div>
                <div className="m-2" onClick={() => navigate(-1)}>
                    <FontAwesomeIcon size="xl" icon={faArrowLeft} />
                    <span className="ms-2">Go back</span>
                </div>
                <Card className='bg-secondary bg-dark'>
                    <Row className='row no-gutters align-items-center'>
                        <Col className="d-flex justify-content-center" xs={4}>
                            <Card.Img
                                src={album.images[0].url}
                                className='ms-2 img-fluid now-playing__cover'
                            />
                        </Col>
                        <Col xs={8}>
                            <Card.Body className='now-playing__side mt-5 me-1'>
                                <Card.Title className='now-playing__name m-3'>{album.name}</Card.Title>
                                <Card.Subtitle className='now-playing__artist ms-3'>
                                    {album.artists[0].name} - {album.release_date.slice(0, 4)} - {album.total_tracks} Tracks
                                </Card.Subtitle>
                                <Button className='m-3' onClick={handleShow}>View Tracks</Button>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
                <Modal size="lg" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="ms-2">Tracks</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul className="list-group">
                            {tracks.map((track) => (
                                <li key={track.id} className="list-group-item">
                                    <Row className="align-items-center">
                                        <Col>
                                            <div className="fw-bold">
                                                {track.name}
                                            </div>
                                            <div>
                                                {track.artists.map((artist, i, { length }) => {
                                                    if (length - 1 === i) {
                                                        return artist.name;
                                                    } else {
                                                        return artist.name + ", "
                                                    }
                                                }
                                                )}
                                            </div>
                                        </Col>
                                        <Col>
                                            {track.preview_url ?
                                                <audio className="float-end" controls>
                                                    <source src={track.preview_url} type="audio/mp3" />
                                                    Your browser does not support the audio element.
                                                </audio>
                                                :
                                                <span className="float-end">No preview available</span>
                                            }
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
                {
                    currentUser && reviews.find(review => review.username === currentUser.username) === undefined && (
                        <div className="ms-2 mt-2">
                            <h2>Review this album</h2>
                            <div>
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
                            <textarea className="form-control mt-1"
                                placeholder="Enter your review"
                                onChange={(e) => {
                                    setNewReview({
                                        ...newReview,
                                        albumReview: e.target.value,
                                    });
                                }}
                                value={newReview.albumReview}>
                            </textarea>
                            <button className="btn btn-primary mt-2"
                                onClick={() => {
                                    console.log(newReview);
                                    dispatch(createReviewThunk(
                                        {
                                            ...newReview,
                                            albumRating: rating,
                                            username: currentUser.username,
                                        }
                                    ));
                                }}
                            >
                                Submit</button>
                        </div>
                    )
                }
                <h2 className="text-center mt-2">Reviews</h2>
                {
                    loading ?
                        <h1>Loading...</h1>
                        :
                        <ul className="list-group mt-2 mb-2">
                            {currentUser && (reviews.find(review => review.username === currentUser.username) ?
                                [
                                    reviews.find(review => review.username === currentUser.username),
                                    ...reviews.filter(review => review.username !== currentUser.username),
                                ]
                                :
                                reviews
                            ).map((review) => (
                                <Review key={review._id} review={review} editable={currentUser && currentUser.username === review.username} show={false}
                                    currentUser={currentUser} />
                            ))
                            }
                        </ul>

                }

            </div >
        );
    }
}

export default SpotifyAlbumScreen;