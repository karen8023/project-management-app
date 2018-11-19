import React, { Component } from "react";
import "./Home.css";
import { API } from "aws-amplify";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


export default class Engineer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      users:[]
    };
  }
  
  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
  
    try {
  
      const userrs = await this.uuser();
      this.setState({ userrs });

    } catch (e) {
      alert(e);
    }
  
    this.setState({ isLoading: false });
  }
  uuser() {
    return API.get("notes", "listuser");
  }

  renderuser(userrs) {
    return [{}].concat(userrs).map(
      (user, i) =>
        i !== 0
          ? <LinkContainer
              // key={user.username}
              // to={`/user/${user.userId}`}
              key=""
              to=""
            >
              {/* <ListGroupItem header={user.}> */}
              <ListGroupItem header={ "" }>

                {/* {"Created: " + new Date(donenote.createdAt).toLocaleString()} */}
              </ListGroupItem>
            </LinkContainer>
          : <LinkContainer
              key=""
              to="/"
            >
              <ListGroupItem>
                <h4>
                  <b></b> 
                </h4>
              </ListGroupItem>
            </LinkContainer>
    );
  }

 
  renderLander() {
    return (
      <div className="lander">
        <h1>Project Management Application</h1>
        <p>manage your project</p>
      </div>
    );
  }


  renderuserList(){
    return (
      <div className="notes">
        <PageHeader>Engineer</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderuser(this.state.users)}
        </ListGroup>
      </div>
    );

  }
  
  render() {
    return (
    
      <div className="users">
        {this.props.isAuthenticated ? this.renderuser() : this.renderLander()}
      </div>
      
    
    );
  }
}