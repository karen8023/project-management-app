import React, { Component } from "react";
import "./Home.css";
import { API } from "aws-amplify";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notes: []
    };
  }
  
  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
  
    try {
      const notes = await this.notes2();
      this.setState({ notes });
    } catch (e) {
      alert(e);
    }
  
    this.setState({ isLoading: false });
  }
  
  notes2() {
    return API.get("notes", "/listall");
  }


  renderNotesList(notes) {
    return [{}].concat(notes).map(
      (note, i) =>
        i !== 0
              ?<ListGroupItem header={note.content.trim().split("\n")[0]}>
               {"Created: " + new Date(note.createdAt).toLocaleString()}
               </ListGroupItem>
          // ? <LinkContainer
          //      key={note.noteId}
          //      to={`/allnotes/${note.noteId}`}
          //   >
          //     <ListGroupItem header={note.content.trim().split("\n")[0]}>
          //       {"Created: " + new Date(note.createdAt).toLocaleString()}
          //     </ListGroupItem>
          //   </LinkContainer>
          : <LinkContainer
              key=""
              to="/"
            >
              <ListGroupItem>
                
              </ListGroupItem>
            </LinkContainer>
    );
  }
  
  

  renderLander() {
    return (
      <div className="lander">
        <h1></h1>
        <p></p>
      </div>
    );
  }

  renderNotes() {
    return (
      <div className="notes">
        <PageHeader>All Projects </PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.notes)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderNotes() : this.renderLander()}
      </div>
    );
  }
}