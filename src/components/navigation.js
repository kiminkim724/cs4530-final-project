import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { faHome, faSearch, faUser, faShield, faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Navigation() {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div>
            <Link to="/">
                <FontAwesomeIcon className="m-2" size="xl" color="black" icon={faHome} />
            </Link>
            <Link to="/search">
                <FontAwesomeIcon className="m-2" size="xl" color="black" icon={faSearch} />
            </Link>
            {!currentUser && <Link to="/login">
                <FontAwesomeIcon className="m-2" size="xl" color="black" icon={faSignIn} />
            </Link>}
            {currentUser && <Link to="/profile">
                <FontAwesomeIcon className="m-2" size="xl" color="black" icon={faUser} />
            </Link>}
            {currentUser && currentUser.isAdmin
                && <Link to="/admin">
                    <FontAwesomeIcon className="m-2" size="xl" color="black" icon={faShield} />
                </Link>}
        </div>
    );
}
export default Navigation;