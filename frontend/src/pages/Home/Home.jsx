import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Home.css';

const Home = () => {
  return (
    <div className="face text-center">
      <div className="">
        <h1 className="display-4">Bienvenido a Shopping List</h1>
        <p className="lead">Organiza tus compras de manera fácil y rápida.</p>
        <Button as={Link} to="/shoppinglist" variant="outline-secondary"> Ir a la Lista</Button>
        
      </div>
    </div>
  );
}

export default Home;