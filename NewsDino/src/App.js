import React, { Component} from 'react';
import Nav from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import News from "./components/News";

export default class App extends Component {

  state = {
    "progress": 0,
    apiKey: process.env.REACT_APP_NEWS_API_KEY,
    topic: ""
  }

  setProgress = (fill) => {
    this.setState({ "progress": fill })
  }

  searchNews = () => {
    let topic = document.getElementById('searchBox').value
    this.setState({ "topic": topic })
  }


  render() {
    return (
      <>
        <Router>
          <LoadingBar color='#f11946' progress={this.state.progress} />
          <Nav searchNews={this.searchNews} />

          <Switch>
            <Route key={"home"} exact path="/"><News changeProgress={this.setProgress} mode={"topHeadline"} apiKey={this.state.apiKey} topic={"general"} pageSize={"6"} /></Route>
            <Route key={"business"} exact path="/business"><News changeProgress={this.setProgress} mode={"topHeadline"} topic={"business"} apiKey={this.state.apiKey} pageSize={"6"} /></Route>
            <Route key={"entertainment"} exact path="/entertainment"><News changeProgress={this.setProgress} mode={"topHeadline"} topic={"entertainment"} apiKey={this.state.apiKey} pageSize={"6"} /></Route>
            <Route key={"health"}  exact path="/health"><News changeProgress={this.setProgress} mode={"topHeadline"} topic={"health"} apiKey={this.state.apiKey} pageSize={"6"} /></Route>
            <Route key={"sports"}  exact path="/sports"><News changeProgress={this.setProgress} mode={"topHeadline"} topic={"sports"} apiKey={this.state.apiKey} pageSize={"6"} /></Route>
            <Route key={"science"}  exact path="/science"><News changeProgress={this.setProgress} mode={"topHeadline"} topic={"science"} apiKey={this.state.apiKey} pageSize={"6"} /></Route>
            <Route key={"technology"}  exact path="/technology"><News changeProgress={this.setProgress} mode={"topHeadline"} topic={"technology"} apiKey={this.state.apiKey} pageSize={"6"} /></Route>
            <Route key={"search" + this.state.topic} exact path="/search"><News changeProgress={this.setProgress} mode={"everything"} topic={this.state.topic} apiKey={this.state.apiKey} pageSize={"6"} /></Route>
          </Switch>
        </Router>
      </>
    )
  }
}
