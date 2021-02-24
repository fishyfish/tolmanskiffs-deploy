import React, {useEffect, useState } from 'react';
import axios from 'axios';
import {link, navigate} from '@reach/router';
import { setServers } from 'dns';

const EditSkiff = (props) => {
        const {skiffId} = props;
        const [skiff, setSkiff] = useState("");
        const [loaded, setLoaded] = useState([]);
        const [ownerName, setOwnerName] = useState(""); 
        const [builderName, setBuilderName] = useState("");
        const [modelName, setModelName] = useState(""); 
        const [startDate, setStartDate] = useState("");
        const [finishDate, setFinishDate] = useState(""); 
        const [buildComplete, setBuildComplete] = useState("");
        const [stockLength, setStockLength] = useState(""); 
        const [customLength, setCustomLength] = useState("");
        const [pictureUrl, setPictureUrl] = useState(""); 
        const [pictureDescription, setPictureDescription] = useState("");
        const [description, setDescription] = useState("");
        const { removeFromDom } = props;
       
        // run once no matter what. useEffect
        useEffect(() => {
            axios.get("http://localhost:8000/api/skiff/" + skiffId) // works fine
                .then((res) => {
                    console.log('This is so awesome' + res.data);
                    setSkiff(res.data);
                    setLoaded(true);

                    const mySkiff =res.data;
                    console.log(mySkiff);
                    setBuildComplete(mySkiff.buildComplete);
                    setOwnerName(mySkiff.ownerName);
                    setBuilderName(mySkiff.builderName);
                    setModelName(mySkiff.modelName);
                    setStartDate(mySkiff.startDate);
                    setFinishDate(mySkiff.finishDate);
                    setStockLength(mySkiff.stockLength);
                    setCustomLength(mySkiff.customLength);
                    setPictureUrl(mySkiff.pictureUrl);
                    setPictureDescription(mySkiff.pictureDescription);
                    setDescription(mySkiff.description);

                })
                .catch(err=>console.log('something is errored out' + err))
        }, []);

        const onSubmitHandler = (e) => {
            e.preventDefault();
            axios.put('http://localhost:8000/api/skiff/'  + skiffId, {
                ownerName:ownerName,    
                builderName:builderName,      
                modelName:modelName,
                startDate:startDate,
                finishDate:finishDate,
                buildComplete:buildComplete,
                stockLength:stockLength,
                customLength:customLength,
                pictureUrl:pictureUrl,
                pictureDescription:pictureDescription,
                description:description,   
            })   
            .then((res) => {
                if(res.data.errors){
                    console.log(res.data.errors)
                    setServers(res.data.errors)
                } else {
                    console.log(res.data);
                    navigate(`/skiff/${res.data._id}`);
                }
                // console.log(res.data);
                // setSkiff(res.data);
                // /navigate(`/skiff/${props.id}`);
            })
                
            .catch(err=>console.log(err))
        };

        //onChange to update firstName and lastName
        return (
            <form onSubmit={onSubmitHandler}>
                <h2>Edit Tolman Skiff</h2>
                <ol className="edit-list" key={props.id}>
                    <li>
                        <label>Owner Name</label>
                        <input type="text" defaultValue={skiff.ownerName} onChange = {(e)=>setOwnerName(e.target.value)}/>
                    </li>
                    <li>
                        <label>Builder Name</label>
                        <input type="text" defaultValue={skiff.builderName} onChange = {(e)=>setBuilderName(e.target.value)}/>
                    </li>
                    <li>
                        {/* make this a drop down */}
                        <label>Model Name</label>
                        <input type="text" defaultValue={skiff.modelName} onChange = {(e)=>setModelName(e.target.value)}/>
                    </li>
                    <li> 
                        <label>Start Date</label>
                        <input type="text" placeholder={skiff.startDate} defaultValue={skiff.startDate} onChange = {(e)=>setStartDate(e.target.value)}/>
                    </li>
                    <li>
                        {/* make this a calendar with input field */}
                        <label>Finish Date</label>
                        <input type="text" placeholder={skiff.finishDate}defaultValue={skiff.finishDate} onChange = {(e)=>setFinishDate(e.target.value)}/>
                    </li>
                    <li>
                        {/* make this true / false radio buttons */}
                        <label>Build Complete</label>
                        {/* <input type="radio" value="yes" name="buildComplete" />
                        <input type="radio" value="no" name="buildComplete" /> */}
                        <input type="text" defaultValue={skiff.buildComplete} onChange = {(e)=>setBuildComplete(e.target.value)}/>
                    </li>
        
                    <li>
                        <label>Stock Length</label>
                        <input type="text" defaultValue={skiff.stockLength} onChange = {(e)=>setStockLength(e.target.value)}/>
                    </li>
                    <li>
                        <label>Custom Length</label>
                        <input type="text" defaultValue={skiff.customLength} onChange = {(e)=>setCustomLength(e.target.value)}/>
                    </li>
                    <li>
                        <label>Picture URL</label>
                        <input type="text" defaultValue={skiff.pictureUrl} onChange = {(e)=>setPictureUrl(e.target.value)}/>
                    </li>
                    <li>
                        <label>Picture Description</label>
                        <input type="text" defaultValue={skiff.pictureDescription} onChange = {(e)=>setPictureDescription(e.target.value)}/>
                    </li>
                    <li>
                        <label>Description</label>
                        <textarea type="text" defaultValue={skiff.description} onChange = {(e)=>setDescription(e.target.value)}>
                        </textarea>
                    </li>
                </ol>
                <div className="button-row">
                    <button type="button" className="myButton secondary"  onClick={() => navigate(`/`)}>
                        Back to All Skiffs
                    </button>
                    <button type="submit" className="myButton">Update Skiff</button> 
                    {/* <button typ="button" onClick={() => DeleteSkiff(skiff._id)}>Delete Skiff</button> */}
                </div>
            </form>
        )
    }

    export default EditSkiff;