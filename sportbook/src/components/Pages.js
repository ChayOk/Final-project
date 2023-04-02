// src/Components/Pages.jsx
import React from "react";

const LoremText = () => (
    <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  );
  const idArray = window.location.pathname.split('/');
  const tournamentId = idArray[2];
const BuildPage = (index) => (
  <>
    <h3>Page {index}</h3>
    <p>TournamentId is {tournamentId}</p><br />
    <div>
      Page {index} content: { <LoremText />}
    </div>
  </>
);

export const PageOne = () => BuildPage(1);
export const PageTwo = () => BuildPage(2);