// App.jsx
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import  Content  from './components/Content';
import { Menu } from './components/Menu';
import Cart from './components/Cart';
import './Main.css';

const App = () => (
<BrowserRouter>
    <>
        <section>
            <div className="MenuSection">{<Menu />}</div>
            <div className="ContentSection">{<Content />}</div>
            <div className="CartSection">{<Cart />}</div>
        </section>
    </>
</BrowserRouter>);

export default App;