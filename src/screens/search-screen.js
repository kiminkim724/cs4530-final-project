import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { searchSpotify } from "../services/spotify-service";
import { useNavigate } from "react-router-dom";
import { Col, Dropdown, Row } from "react-bootstrap";
import { Card, Container } from "react-bootstrap";
function SpotifySearchScreen() {
    const { searchType, searchTerm } = useParams();
    const navigate = useNavigate();
    const [search, setSearch] = useState(searchTerm);
    const [type, setType] = useState('album');
    const [results, setResults] = useState([]);
    const searchSpotifyQuery = async () => {
        if (search !== "") {
            const results = await searchSpotify(search, 8, type);
            setResults(results);
            navigate(`/search/${type}/${search}`);
        }
    };
    useEffect(() => {
        if (searchTerm) {
            setSearch(searchTerm);
            searchSpotifyQuery();
        }
    }, [searchTerm]);

    return (
        <div>
            <h1 className="text-center">Search Spotify: {searchTerm && '"' + searchTerm + '"'}</h1>
            <Row className="form-group">
                <Col xs={2} className="ms-2 dropdown-size">
                    <Dropdown className="ml-2" onSelect={(eventKey) => { console.log(eventKey); setType(eventKey) }}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className="w-100 dropdown-size">
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {/* <Dropdown.Item eventKey={"artist"}>Artist</Dropdown.Item> */}
                            <Dropdown.Item eventKey={"album"}>Album</Dropdown.Item>
                            <Dropdown.Item eventKey={"track"}>Track</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col className="ps-0 pe-2 me-2">
                    <input
                        type="text"
                        className="form-control ms-3"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>
                <Col xs={1} className="p-0">
                    <button onClick={searchSpotifyQuery} className="btn btn-primary">
                        Search
                    </button>
                </Col>
            </Row>
            <Container className="mt-4">
                <Row className="mx-2 row row-cols-4">
                    {(() => {
                        switch (searchType) {
                            case 'album':
                                return results.map(result => (
                                    <Link className="text-decoration-none mb-4 h-100" to={`/spotify/album/${result.id}`}>
                                        <Card key={result.id} className="bg-dark">
                                            <Card.Img className="mb-2" src={result.images[0].url} />
                                            <Card.Body>
                                                <Card.Title className="text-white result-title">{result.name}</Card.Title>
                                                <Link className="text-decoration-none" to={`/spotify/artist/${result.artists[0].id}`}>
                                                    <Card.Subtitle className="text-secondary mb-4">{result.artists[0].name}</Card.Subtitle>
                                                </Link>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                ));
                            case 'artist':
                                return results.map(result => (
                                    <Link className="text-decoration-none" to={`/spotify/artist/${result.id}`}>
                                        <Card key={result.id} className="bg-secondary">
                                            <Card.Img src={result.images[0].url} />
                                            <Card.Body>
                                                <Card.Title className="text-white text-decoration-none">{result.name}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                ));
                            case 'track':
                                return results.map(result => (
                                    <Link className="text-decoration-none mb-4" to={`/spotify/album/${result.album.id}`}>
                                        <Card key={result.id} className="bg-dark h-100">
                                            <Card.Img className="mb-2" src={result.album.images[0].url} />
                                            <Card.Body>
                                                <Card.Title className="text-white result-title">{result.name}</Card.Title>
                                                <Link className="text-decoration-none" to={`/spotify/artist/${result.artists[0].id}`}>
                                                    <Card.Subtitle className="text-secondary mb-4">{result.artists[0].name}</Card.Subtitle>
                                                </Link>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                ));
                            default:
                                break;
                        }
                    })()}
                </Row>
            </Container>
        </div>
    );
}

export default SpotifySearchScreen;