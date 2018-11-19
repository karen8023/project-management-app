import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Auth, API } from 'aws-amplify';

class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      //isAuthenticated: false
      isAuthenticated: false,
      isAuthenticating: true,
      isAdmin:true,
      isManager:true,
      user:{}
    };
  }
  
  async componentDidMount() {
     
    //const userInfo = await Auth.currentAuthenticatedUser();
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
      let userInfo = await Auth.currentUserInfo();
      //alert(userInfo.username);
      let userData = await API.get('notes', `user/${userInfo.username}`);
      //alert(userData);
      //
      
      if (userData.Role === "admin") {
        this.setState({
            isAdmin: true
        })
    } else if (userData.Role === "manager") {
        this.setState({
            isManager: true
        })
    }
    
    
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }
  
  handleLogout = async event => {
    await Auth.signOut();
  
    this.userHasAuthenticated(false);
  }
 

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      isAdmin:this.state.isAdmin,
      isManager:this.state.isManager
    };

    
    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Home</Link>&nbsp;&nbsp;&nbsp;&nbsp;
              {/* <Link to="/Project">Projects</Link>&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/Engineer">Engineers</Link> */}
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
               <Nav>
                     <NavDropdown eventKey={1} title="Projects" id="basic-nav-dropdown">

                          <LinkContainer to="/Project">
                                <MenuItem eventKey={1.1}>
                                    <span>All projects</span>
                                </MenuItem>
                            </LinkContainer>
                            {this.state.isManager ?
                                <LinkContainer to="/notes/new">
                                    <MenuItem eventKey={1.2}>
                                        <span>New project</span>
                                    </MenuItem>
                                </LinkContainer>
                                :
                                null
                            }
                        </NavDropdown>
                    </Nav>


                    <Nav>
                    <NavDropdown eventKey={2} title="Engineer" id="basic-nav-dropdown">

                        <LinkContainer to="/Engineer">
                              <MenuItem eventKey={2.1}>
                                  <span>All Engineers</span>
                              </MenuItem>
                          </LinkContainer>
                          {this.state.isAdmin ?
                              <LinkContainer to="/user/new">
                                  <MenuItem eventKey={2.2}>
                                      <span>New Engineer</span>
                                  </MenuItem>
                              </LinkContainer>
                              :
                              null
                          }
</NavDropdown>
                    </Nav>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
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
        <Routes childProps={childProps} />
      </div>
    );
  }
}

//export default App;
export default withRouter(App);
