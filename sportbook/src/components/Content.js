import React from "react";
// import EventRow from "./EventsList";
import { Routes, Route } from 'react-router-dom';
import EventsList from './EventsList';
import {PageOne} from './Pages';
import '../Content.css';


function Content() {
    return (
        <div className="main">
            <div className="sport_tourenament">
                <h4 className="title">SOCCER &raquo; SUPER LIG</h4>
            </div>
            <div className="events">
          <Routes>
            <Route exact path="/" element={<PageOne />} />
            <Route exact path="/events/:countryName/:tournamentId" element={<EventsList />} />
          </Routes>
          </div>
        </div>
    );
  }
  
  export default Content;