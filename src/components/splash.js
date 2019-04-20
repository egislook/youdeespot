import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <section className="dp:flx ai:c mnh:100vh c:blue">
    <div>
       <h1 className="title">
            Welcome to ReactPWA
        </h1>
        <h2 className="subtitle">
            An extendable boilerplate built on top of PawJS, for developers
        </h2>
        <Link to="/home" className="button">Checkout the full demo</Link>
    </div>
  </section>
);
