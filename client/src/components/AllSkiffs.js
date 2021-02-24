import React, {useEffect, useState } from 'react';
import axios from 'axios';
import {link, navigate} from '@reach/router';

const AllSkiffs = (prop) => {
    const [allSkiffs, setAllSkiffs] = useState([]);
    useEffect(() => {
        axios
        .get('http://localhost:8000/api/skiffs')
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
            <h2>All Tolman Skiffs</h2>
            <p><button className="myButton" onClick={() => navigate(`/skiffs/new/`)}>
                            Add a New Tolman Skiff
                        </button>
            </p>
            <ol className="all-skiffs">
            {
                allSkiffs.map((skiff, index) =>(
                    <li key={index}>
                        <img src={ skiff.pictureUrl } alt={ skiff.pictureDescription }/>
                        <h4>{ `${skiff.ownerName }'s  ${ skiff.modelName } Skiff`}</h4>
                        <p>
                            <button className="myButton" onClick={() => navigate(`/skiff/${skiff._id}`)}>
                            View Skiff
                        </button>

                        {/* <a onClick={() => navigate(`/skiff/${skiff._id}`)}>This is a link </a> */}
                        
                        <button typ="button" onClick={() => deleteSkiff(skiff._id)}>Delete Skiff</button>

                        <button type="button" className="myButton" onClick={() => navigate(`/skiff/${skiff._id}/edit`)}>Edit Skiff </button>
                        </p>
                    </li>
                ))
            }
            </ol>
        </div>
    )
}

export default AllSkiffs;