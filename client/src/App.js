import './App.css';
import React from 'react';
import { Router } from '@reach/router';
//import Main from './views/Main';
//import SkiffForm from './components/SkiffForm';
import NewSkiff from './components/NewSkiff';
import EditSkiff from './components/EditSkiff';
import OneSkiff from './components/OneSkiff';
import AllSkiffs from './components/AllSkiffs';
import DeleteSkiff from './components/DeleteSkiff';

function App() {
  const NotFound = () => {
    return (
      <div className="error"> Route Not Found</div>
    )
  };
  return (
    <div className="App">
      <div id="skiff"></div>
      <Router> 
        <AllSkiffs path="/"/>
        <NewSkiff path="/skiffs/new" /> 
        <OneSkiff path="/skiff/:id" />
        <EditSkiff path="/skiff/:skiffId/edit" />
        <NotFound default /> 
      </Router>
    </div>
  );
}
export default App;