import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";
import Project from "./containers/Project";
import Engineer from "./containers/Engineer";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import allnotes from "./containers/allnotes"
import NewtodoNote from "./containers/NewTodo";
import NewdoneNote from "./containers/NewDone";
import todoNotes from "./containers/todoNote";
import NewUser from "./containers/NewUser";

export default ({ childProps }) =>
  <Switch>
     
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/notes/new" exact component={NewNote} props={childProps} />
    <AuthenticatedRoute path="/notes/:id" exact component={Notes} props={childProps} />
    <AuthenticatedRoute path="/Project" exact component={Project} props={childProps} />
    <AuthenticatedRoute path="/Engineer" exact component={Engineer} props={childProps} />
    <AuthenticatedRoute path="/allnotes/:id" exact component={allnotes} props={childProps} />
    <AuthenticatedRoute path="/todo/new" exact component={NewtodoNote} props={childProps} />
    <AuthenticatedRoute path="/todo/:id" exact component={todoNotes} props={childProps} />
    <AuthenticatedRoute path="/user/new" exact component={NewUser} props={childProps} />
    <AuthenticatedRoute path="/done/new" exact component={NewdoneNote} props={childProps} />

    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;