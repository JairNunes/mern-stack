import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Camera } from "../assets/camera.svg";

export default function Header() {
 
  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="feed">
          <Logo/>
        </Link>
        <Link to="new">
          <Camera/>
        </Link>
      </div>
    </header>
  );
}
