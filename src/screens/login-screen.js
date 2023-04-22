import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, registerThunk } from "../services/auth-thunks";

function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [login, setLogin] = useState(true);
    const [admin, setAdmin] = useState(false);

    const handleChange = () => {
        setAdmin(!admin);
    };

    const { currentUser } = useSelector((state) => state.user);
    const toggleLogin = () => { setLogin(!login) };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = async () => {
        const user = await dispatch(loginThunk({ username, password }));
        console.log(user)
        if (user.payload) {
            navigate("/profile");
        } else {
            alert("Username/Password is incorrect")
        }
    };
    const handleRegister = async () => {
        var user;
        if (admin && adminPassword !== process.env.REACT_APP_ADMIN_PW) {
            alert("Admin password is incorrect");
        } else if (admin && adminPassword === process.env.REACT_APP_ADMIN_PW) {
            user = await dispatch(registerThunk({ username, password, isAdmin: true, role: "admin" }));
        } else {
            user = await dispatch(registerThunk({ username, password }));
        }
        console.log(user)
        if (user.payload) {
            navigate("/profile");
        } else {
            alert("Username already exists")
        }
    }

    useEffect(() => {
        if (currentUser) {
            alert("Already logged in")
            navigate("/profile");
        }
    }, [])


    if (login) {
        return (
            (
                <div className="Auth-form-container">
                    <form className="Auth-form">
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Sign In</h3>
                            <div className="text-center">
                                Not registered yet?{" "}
                                <button type="button" className="Auth-change-form link-primary" onClick={toggleLogin}>
                                    Sign Up
                                </button>
                            </div>
                            <div className="form-group mt-3">
                                <label>Username</label>
                                <input className="form-control mt-1"
                                    type="text" value={username}
                                    placeholder="Enter Username"
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control mt-1"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button type="button" className="btn btn-primary" onClick={handleLogin}>
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )
        );
    }
    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign Up</h3>
                    <div className="text-center">
                        Already registered?{" "}
                        <button type="button" className="Auth-change-form link-primary" onClick={toggleLogin}>
                            Sign In
                        </button>
                    </div>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input className="form-control mt-1"
                            placeholder="Enter Username"
                            type="text" value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter Password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <label className="mt-2">
                        <input
                            type="checkbox"
                            checked={admin}
                            onChange={handleChange}
                        />
                        <span className="ms-1">
                            Admin?
                        </span>
                    </label>
                    {admin &&
                        <div className="form-group mt-1">
                            <label>Admin Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter Admin Password"
                                onChange={(event) => setAdminPassword(event.target.value)}
                            />
                        </div>}

                    <div className="d-grid gap-2 mt-3">
                        <button type="button" className="btn btn-primary" onClick={handleRegister}>
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default LoginScreen;