import React from 'react';
import createReactClass from 'create-react-class';

import Api from '../api/api';

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
        this._loadStories();
    },
    _loadStories: function(){
        Api.getStories().then(res =>
        {
            this.setState({stories: res.data, loadedStories:true});
            console.log(this.state.stories);
        },err => {
            alert('There was an error loading the stories. ' + err);
        });
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
                <div className='title-bar'>
                    Story list.
                </div>
                <table className='table__newstory'>
                    <thead className='table-header'>
                        <tr>
                            <th>New Story</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Title:</td>
                        </tr>
                        <tr>
                            <td><input className='input-title' type='text'/></td>
                        </tr>
                        <tr>
                            <td>Content (Between 300 ~ 500 Words):</td>
                        </tr>
                        <tr>
                            <td><textarea className='input-content' name='content' rows='10'/></td>
                        </tr>
                        <tr>
                            <td><button className='btn btn--primary' type='button'>Submit</button></td>
                        </tr>
                    </tbody>
                </table>
                <table className='table__stories'>
                    <thead className='table-header'>
                        <tr>
                            <th className='title-col'>Title</th>
                            <th className='content-col'>Content</th>
                            <th className='button-col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='story-listitem'>
                            <td>Title</td>
                            <td>This is some content (But it's invalid because it's under 300 words)</td>
                            <td><button className='btn btn--danger' type='button'>Delete Story</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

        );
    }
});

export default StoryListComponent;
