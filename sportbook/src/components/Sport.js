import React from "react";
import SportList from './SportList';


const BuildSport = () => (
    <>
        <ul className="sportList">
            {<SportList />}
        </ul>
        {/* <div className="countryBlock">
            {<Country />}
        </div> */}
    </>
);

export const Sport = () => BuildSport();