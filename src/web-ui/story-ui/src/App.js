import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import StoryList from './components/storyList';
import StoryItem from './components/storyItem';

class App extends Component {
  render() {
    return (
        <div>
        <NavigationBar />
        <Router>
            <div>
                <Route exact path='/' component={StoryList} />
                <Route exact path='/:storyId' component={StoryItem} />
            </div>
        </Router>

        </div>
    );
  }
}

const NavigationBar = () =>{
    return (
        <div className='navigation-bar'>
            Story Writer Service
        </div>
    )
}

export default App;
