import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">CommunityBuilder</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/communities" className="nav-link">Communities</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Community</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
          <li className="navbar-item">
          <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="navbar-item">
          <Link to="/register" className="nav-link">Register</Link>
          </li>
          <li className="navbar-item">
          <Link to="/datatype" className="nav-link">Datatype</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}