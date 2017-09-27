import React from 'react';
import createReactClass from 'create-react-class';

const StoryListComponent = createReactClass({
    getInitialState: function(){
        return {
            stories: [],
            loadedStories: false
        };
    },
    componentDidMount: function(){
        this._init(this.props);
    },
    componentWillReceiveProps: function(newProps){
        this._init(newProps);
    },
    _init: function(props){
        this.setState({stories: [], loadedStories: false});
    },
    _loadStories: function(){
        //Load Stoies here!
    },
    _saveNewStory: function(story){
        //Save new story here.
        console.log(story);
    },
    _updateStory: function(story){
        console.log(story);
    },
    _deleteStory: function(id){
        console.log(id);
    },
    render: function(){
        return (
            <div>
                IT'S A RENDER THING!
            </div>
        );
    }
});

export default StoryListComponent;
