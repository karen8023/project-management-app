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
      notes: [],
      todonotes:[],
      donenotes:[]
    };
  }
  
  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
  
    try {
      const notes = await this.notes();
      const todonotes = await this.todonotes();
      const donenotes = await this.donenotes();
      this.setState({ notes });
      this.setState({ todonotes });
      this.setState({ donenotes });
    } catch (e) {
      alert(e);
    }
  
    this.setState({ isLoading: false });
  }
  
  notes() {
    return API.get("notes", "/notes");
  }

  todonotes(){
    return API.get("notes","/todo");
  }
   
  donenotes(){
    return API.get("notes","/done");

  }

  renderdoneNoteList(donenotes) {
    return [{}].concat(donenotes).map(
      (donenote, i) =>
        i !== 0
          ? <LinkContainer
              key={donenote.noteId}
              to={`/todo/${donenote.noteId}`}
            >
              <ListGroupItem header={donenote.content.trim().split("\n")[0]}>
                {"Created: " + new Date(donenote.createdAt).toLocaleString()}
              </ListGroupItem>
            </LinkContainer>
          : <LinkContainer
              key="new"
              to="/done/new"
            >
              <ListGroupItem>
                <h4>
                  <b>{"\uFF0B"}</b> Create a new project
                </h4>
              </ListGroupItem>
            </LinkContainer>
    );
  }


  rendertodoNoteList(todonotes) {
    return [{}].concat(todonotes).map(
      (todonote, i) =>
        i !== 0
          ? <LinkContainer
              key={todonote.noteId}
              to={`/todo/${todonote.noteId}`}
            >
              <ListGroupItem header={todonote.content.trim().split("\n")[0]}>
                {"Created: " + new Date(todonote.createdAt).toLocaleString()}
              </ListGroupItem>
            </LinkContainer>
          : <LinkContainer
              key="new"
              to="/todo/new"
            >
              <ListGroupItem>
                <h4>
                  <b>{"\uFF0B"}</b> Create a new project
                </h4>
              </ListGroupItem>
            </LinkContainer>
    );
  }

  renderNotesList(notes) {
    return [{}].concat(notes).map(
      (note, i) =>
        i !== 0
          ? <LinkContainer
              key={note.noteId}
              to={`/notes/${note.noteId}`}
            >
              <ListGroupItem header={note.content.trim().split("\n")[0]}>
                {"Created: " + new Date(note.createdAt).toLocaleString()}
              </ListGroupItem>
            </LinkContainer>
          : <LinkContainer
              key="new"
              to="/notes/new"
            >
              <ListGroupItem>
                <h4>
                  <b>{"\uFF0B"}</b> Create a new project
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

  renderNotes() {
    return (
      <div className="notes">
        <PageHeader>To Do Task</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.notes)}
        </ListGroup>
      </div>
    );
  }
  
  rendertodoNotes(){
    return (
      <div className="notes">
        <PageHeader>IN Progess Task</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.rendertodoNoteList(this.state.todonotes)}
        </ListGroup>
      </div>
    );

  }

  renderdoneNotes(){
    return (
      <div className="notes">
        <PageHeader>Done Task</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderdoneNoteList(this.state.donenotes)}
        </ListGroup>
      </div>
    );

  }
  render() {
    return (
    <div>
      <div className="Home">
        {this.props.isAuthenticated ? this.renderNotes() : this.renderLander()}
      </div>
      <div className="Home">
        {this.props.isAuthenticated ? this.rendertodoNotes() : this.renderLander()}
      </div>
      <div className="Home">
        {this.props.isAuthenticated ? this.renderdoneNotes() : this.renderLander()}
      </div>
    </div>
    );
  }
}