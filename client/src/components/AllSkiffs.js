import React, {useEffect, useState } from 'react';
import axios from 'axios';
import {link, navigate} from '@reach/router';

const AllSkiffs = (prop) => {
    const [allSkiffs, setAllSkiffs] = useState([]);
    useEffect(() => {
        axios
        .get('http://localhost:8000/api/skiffs/')
        .then((response) => {
            console.log(response.data);
            setAllSkiffs(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);


    const deleteSkiff = (skiffId) => {
        axios.delete("http://localhost:8000/api/skiff/" + skiffId)
        .then ((res) => {
            const deletedSkiff = res.data;
            console.log(deletedSkiff);
            const filteredSkiffsArray = allSkiffs.filter((skiff) => skiff._id !== skiffId);
            setAllSkiffs(filteredSkiffsArray);
        })
        .catch ((err) => {
            console.log(err);
        });
    }
    return (
        <div className="all-tolman-skiffs">
            <header>
                <h1>Tolman Skiff Projects</h1>
                <button className="myButton" onClick={() => navigate(`/skiffs/new/`)}>
                    Add a New Tolman Skiff
                </button>
            </header>
        
            <ol className="all-skiffs">
            {
                allSkiffs.map((skiff, index) =>(
                    <li key={index}>
                        <span className="image-wrapper"><img onClick={() => navigate(`/skiff/${skiff._id}`)} src={ skiff.pictureUrl } alt={ skiff.pictureDescription } title={ skiff.pictureDescription }/></span>
                        <h4>{ `${skiff.ownerName }'s  ${ skiff.modelName } Skiff`}</h4>
                        <div className="button-wrapper">
                            <button className="myButton secondary" onClick={() => navigate(`/skiff/${skiff._id}`)}>View Skiff Details</button>
                            <button type="button" className="myButton" onClick={() => navigate(`/skiff/${skiff._id}/edit`)}>Edit Skiff </button>
                            <button type="button" className="myButton" 
                            onClick={() => { if (window.confirm('Are you sure you wish to delete this Skiff?')) deleteSkiff(skiff._id) } } >Delete Skiff</button>
                        </div>
                    </li>
                ))
            }
            </ol>
        </div>
    )
}

export default AllSkiffs;