import React from 'react';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state ={
    };
  }

  render() {
    return (
      <div className="navbar navbar-dark" >
        <a href="/" className="navbar"><img className="logo" src="../img/logo.png" /></a>
      </div>
    );
  }
}

export default Navbar;