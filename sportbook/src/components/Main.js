import React from "react";
import  Content  from './Content';
import { Menu } from './Menu';
import '../Main.css';


const BuildSite = () => (
    <>
        <section>
            <div className="MenuSection">{<Menu />}</div>
            <div className="ContentSection">{<Content />}</div>
        </section>
    </>
);

export const Main = () => BuildSite();