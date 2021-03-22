import React from 'react';
import { navigate}  from '@reach/router';
import axios from "axios";

const Header = () => {

    const logout = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/user/logout", {
            // no body required for this request
        },{
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data);
            navigate("/");
        })
        .catch(err => {
            console.log(err);
        })
    };
    return (
        <header>
            <h1>Tolman Skiff Projects</h1>
            <div className="button-wrapper">
                <button className="myButton" onClick={() => navigate("/")}>All Skiffs</button>
                <button className="myButton"  onClick={() => navigate("/logreg")}>Login / Register</button>
                <button className="myButton"  onClick={(e) => logout(e)}>Logout</button>
                <button className="myButton" onClick={() => navigate(`/skiffs/new/`)}>
                    Add Tolman Skiff
                </button>
            </div>
        </header>
    )
}

export default Header;