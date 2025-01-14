import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useAuth } from "../../context/AuthContext";
import { Link } from 'react-router-dom';

const NavBar = () => {
    const { user, logout } = useAuth();

    return (
        <Navbar bg="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">Shopping List</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/shoppinglist">Shopping List</Nav.Link>
                    <Nav.Link as={Link} to="/users">Users</Nav.Link>
                </Nav>
                {user ? (
                    <Button onClick={logout}>Logout</Button>
                ) : (
                    <Button as={Link} to="/login"> ingresar </Button>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;