import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  state = {
    progress: 0
  }
  changeProgress = (progress)=>{
    this.setState({progress: progress})
  }

  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
       
      />
        <Routes>
        <Route exact path="/"  element={<News changeProgress={this.changeProgress} key="Home" pageSize={5} country="us" category="general"/>}></Route>
        <Route exact path="/business" element={<News changeProgress={this.changeProgress}key="business" pageSize={5} country="us" category="Business"/>}></Route>
        <Route exact path="/entertainment" element={<News changeProgress={this.changeProgress}key="entertainment" pageSize={5} country="us" category="Entertainment"/>} ></Route>
        <Route exact path="/general" element={<News changeProgress={this.changeProgress}key="general" pageSize={5} country="us" category="General"/>} ></Route>
        <Route exact path="/health" element={<News changeProgress={this.changeProgress}key="health" pageSize={5} country="us" category="Health"/>} ></Route>
        <Route exact path="/science" element={<News changeProgress={this.changeProgress}key="science" pageSize={5} country="us" category="Science"/>} ></Route>
        <Route exact path="/sports" element={<News changeProgress={this.changeProgress}key="sports" pageSize={5} country="us" category="Sports"/>} ></Route>
        <Route exact path="/technology" element={<News changeProgress={this.changeProgress}key="technology" pageSize={5} country="us" category="Technology"/>} ></Route>
        </Routes>
        </Router>
      </div>
    )
  }
}
