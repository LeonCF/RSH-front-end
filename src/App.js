import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './model';
import * as window from './pages/window'
import * as modules from './pages/modules'
import mirror from 'mirrorx';
import GoBack from './pages/window/controller/goBack';
import GoForward from './pages/window/controller/goForward';
let {withRouter, Switch, Route, connect, actions} = mirror;


class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="window-common">
              <div className="window-left window-controller">
                <GoBack history={this.props.history}/>
              </div>
              <div className="window-right window-controller">
                <GoForward history={this.props.history}/>
              </div>
              
              <h4 className="window-title"> Leon BM </h4>
              <div className="window-main"></div>
              <div className="window-main--text">
                
                <Switch>
                  <Route path='/' exact component = { window.CommonWindow } />
                  <Route path='/blackWhite' component = { modules.BlackWhite } />
                  <Route path='/webStatus' component = { modules.WebStatus } />
                  <Route path='/aboutMe' component = { modules.AboutMe } />
                  <Route path='/secret' component = {modules.Secret} />
                </Switch>
              </div>
          </div>
      </div>
    );
  }
}

const Root = withRouter(
  connect((state) => {
    return state.app;
  })(App));

export default Root;