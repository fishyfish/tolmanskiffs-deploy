import React, {useEffect, useState } from 'react';
import axios from 'axios';
import {link, navigate} from '@reach/router';
// import { isValidObjectId } from 'mongoose';
import io from 'socket.io-client';

const AllSkiffs = (prop) => {
    const [socket ] = useState(() => io(":8000"));
    const [socketMessage, setSocketMessage] = useState('connecting to server');
    const [allSkiffs, setAllSkiffs] = useState([]);
    const [skiffCount, setSkiffCount] = useState(0);

    useEffect(() => {
        console.log('socket use effect method');
        socket.on('new_added_skiff', (data) => {
            console.log("new added skiff");
            console.log(data);
            console.log("all skiffs");
            console.log(allSkiffs);
            setSocketMessage(`${data.ownerName} ${data.modelName} `);
            // setSocketMessage(`check out new skiff`);
            setAllSkiffs([data, ...allSkiffs]);
        })
        return () => socket.disconnect(true);
    }, [skiffCount]);

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
            <h3>{socketMessage}</h3>
            <ol className="all-skiffs">
            {
                allSkiffs.map((skiff, index) =>(
                    <li key={index}>
                        <span className="image-wrapper"><img onClick={() => navigate(`/skiff/${skiff._id}`)} src={ skiff.pictureUrl } alt={ skiff.pictureDescription } title={ skiff.pictureDescription }/></span>
                        <h4>{ `${skiff.ownerName }'s  ${ skiff.modelName } Skiff`}</h4>
                        <div className="button-wrapper">
                            <button className="myButton secondary" onClick={() => navigate(`/skiff/${skiff._id}`)}>View Skiff Details</button>
                            <button type="button" className="myButton" onClick={() => navigate(`/skiff/${skiff._id}/edit`)}>Edit Skiff </button>
                            <button type="button"s className="myButton" 
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