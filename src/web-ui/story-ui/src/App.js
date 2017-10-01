import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import StoryList from './components/storyList';

class App extends Component {
  render() {
    return (
        <div>
            <div className='navigation-bar'>
                Story Writer Service
            </div>
            <StoryList />
        </div>
    );
  }
}

export default App;
