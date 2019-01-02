import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">ReactJS+GraphQL</span>
        </Link>
      </nav>
    </Fragment>
  )
};

export default NavBar;
