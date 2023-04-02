import React from "react";
import {TournamentList} from './TournamentList';


const BuildTournament = () => (
    <>
        <ul className="tournametList">
            <TournamentList />
        </ul>
    </>
);

export const Tournament = () => BuildTournament();