import React from "react";
import {Sport} from "./Sport";
import '../Menu.css';


const BuildMenu = () => (
        <div className="menu">
            <div className="titleBlock">
                <h4 className="title">SPORT BETTING</h4>
            </div>
            <div className="sportBlock">
                {<Sport />}
            </div>
        </div>
);

export const Menu = () => BuildMenu();