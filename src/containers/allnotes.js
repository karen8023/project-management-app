import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./allnote.css";
import { s3Upload } from "../libs/awsLib";

export default class Notes extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
        isLoading: null,
        isDeleting: null,
        note: null,
        content: "",
        attachmentURL: null
      };
  }

  async componentDidMount() {
    try {
      let attachmentURL;
      const note = await this.getNote();
      const { content, attachment } = note;

      if (attachment) {
        attachmentURL = await Storage.vault.get(attachment);
      }

      this.setState({
        note,
        content,
        attachmentURL
      });
    } catch (e) {
      alert(e);
    }
  }

  getNote() {
    return API.get("notes", `/getallp/${this.props.match.params.id}`);
  }

  validateForm() {
    return this.state.content.length > 0;
  }
  
  formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }
  
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  handleFileChange = event => {
    this.file = event.target.files[0];
  }
  
  
  //sending email to join the projects
  handleSubmit = async event => {
    // let attachment;
  
    // event.preventDefault();
  
    // if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
    //   alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
    //   return;
    // }
  
    // this.setState({ isLoading: true });
  
    // try {
    //   if (this.file) {
    //     attachment = await s3Upload(this.file);
    //   }
  
    //   await this.saveNote({
    //     content: this.state.content,
    //     attachment: attachment || this.state.note.attachment
    //   });
    //   this.props.history.push("/");
    // } catch (e) {
    //   alert(e);
    //   this.setState({ isLoading: false });
    // }
  }

  render() {
    return (
      <div className="allnote">
        {this.state.note &&
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="content">
              <FormControl
                onChange={this.handleChange}
                value={this.state.content}
                componentClass="textarea"
              />
            </FormGroup>
            {this.state.note.attachment &&
              <FormGroup>
                <ControlLabel></ControlLabel>
                <FormControl.Static>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={this.state.attachmentURL}
                  >
                    {this.formatFilename(this.state.note.attachment)}
                  </a>
                </FormControl.Static>
              </FormGroup>}
           
            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="send email to join it"
              loadingText="Sending Email…"
            />
           
          </form>}
      </div>
    );
  }
}