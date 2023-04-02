import React from "react";
import {Tournament} from "./Tournament";
import { CountryList } from "./CountryList";


const BuildCountry = () => (
    <>
        <ul className="countryList">
            {/* <CountryList /> */}
        </ul>
        <div className="tournamentBlock">
            {<Tournament />}
        </div>
    </>
);

export const Country = () => BuildCountry();