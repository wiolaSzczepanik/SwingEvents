import React from 'react';
import './Banner.css'

const Banner = ({ appName, token }) => {
  if (token) {
    return null;
  }
  return (
    <div className="Banner">
      <div className="container">
        <h1>
          kiedy tańczę?
        </h1>
        <h1>w</h1>
        <div className="dropdown">
          <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            &nbsp; Krakowie &nbsp;
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#">&nbsp; Krakowie &nbsp; &nbsp; </a>
            <a className="dropdown-item" href="#">&nbsp; Poznaniu &nbsp; &nbsp; </a>
            <a className="dropdown-item" href="#">&nbsp; Gdańsku &nbsp; &nbsp; </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
