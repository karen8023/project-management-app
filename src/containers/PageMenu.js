import React, { Fragment } from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import './PageMenu.css';
const NavMenu = (props) => {
    return (
        !props.isAuthenticating &&
        <div className="App container">
            <Navbar fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <LinkContainer to="/">
                            <a href="#brand">Home</a>
                        </LinkContainer>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown eventKey={1} title="Projects" id="basic-nav-dropdown">

                            <LinkContainer to="/projects/all">
                                <MenuItem eventKey={1.1}>
                                    <span>To Do project<span className="glyphicon glyphicon-tasks"></span></span>
                                </MenuItem>
                            </LinkContainer>
                             <LinkContainer to="/projects/create">
                                    <MenuItem eventKey={1.2}>
                                        <span>IN Progess<span className="glyphicon glyphicon-plus"></span></span>
                                    </MenuItem>
                                </LinkContainer>
                            }
                            <LinkContainer to="/projects/create">
                                    <MenuItem eventKey={1.3}>
                                        <span>Done Projects<span className="glyphicon glyphicon-plus"></span></span>
                                    </MenuItem>
                                </LinkContainer>
                            }
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <LinkContainer to="/users/all">
                            <NavItem eventKey={2}>
                                All users<span className="glyphicon glyphicon-user all"></span>
                            </NavItem>
                        </LinkContainer>
                    </Nav>
                    <Nav pullRight>
                        {props.isAuthenticated
                            ? <NavItem onClick={() => props.handleLogOut()}>Logout</NavItem>
                            : <Fragment>
                                <LinkContainer to="/signup">
                                    <NavItem>Signup</NavItem>
                                </LinkContainer>
                                <LinkContainer to="/login">
                                    <NavItem>Login</NavItem>
                                </LinkContainer>
                            </Fragment>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}
export default NavMenu

