import React from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';

const NavbarComponent = () => {
    return (
        <Navbar varian="light" expand="lg">
            <Container>
            <Navbar.Brand href="#home"><strong>Resto Haerul</strong></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home"><strong>Home</strong></Nav.Link>
                    <Nav.Link href="#link"><strong>Link</strong></Nav.Link>
                    <NavDropdown class="font-weight-bold" title="Dropdown" id="basic-nav-dropdown">                        
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;