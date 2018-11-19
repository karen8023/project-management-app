import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Newuser.css";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";

export default class NewUser extends Component {
  constructor(props) {
    super(props);
    this.file = null;

    this.state = {
      isLoading: null,
      email:"",
      username:"",
      postion:"",
      role:""

    };
  }


  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
    event.preventDefault();
  
    this.setState({ isLoading: true });
  
    try {
     
      await this.createNote({
        username: this.state.username,
        email: this.state.email,
        postion: this.state.postion,
        role: this.state.role 

      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }
  
  createNote(user) {
    return API.post("notes", "/user", {
      body: user
    });
  }

  render() {
    return (
      <div className="Newuser">
        <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="username">
        username:
            <FormControl
              onChange={this.handleChange}
              value={this.state.username}
              componentClass="textarea"
            />
          </FormGroup>
            emial:
            <FormGroup controlId="email">
            <FormControl
              onChange={this.handleChange}
              value={this.state.email}
              componentClass="textarea"
            />
          </FormGroup>
              postion:
            <FormGroup controlId="postion">
            <FormControl
              onChange={this.handleChange}
              value={this.state.postion}
              componentClass="textarea"
            />
          </FormGroup>
            role:
          <FormGroup controlId="role">
            <FormControl
              onChange={this.handleChange}
              value={this.state.role}
              componentClass="textarea"
            />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}