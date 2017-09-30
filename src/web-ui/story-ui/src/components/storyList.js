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
    _makeStoryLine: function(story){
        return <StoryLine key={story.id} story={story} buttonOnClick={() => {this._deleteStory(story.id)}}/>
    },
    render: function(){
        const storyLines = this.state.stories.map(s => {
            const line = [this._makeStoryLine(s)];
            return line;
        });
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
                            <td className='submit-row'><button className='btn btn--primary submit-button' type='button'>Submit</button></td>
                        </tr>
                        <tr>
                            <td />
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
                        {[].concat.apply([],storyLines)}
                    </tbody>
                </table>
            </div>

        );
    }
});


const StoryLine = ({ story , buttonOnClick}) => {
    return(
    <tr className='story-listitem'>
        <td>{story.title}</td>
        <td>{story.content}</td>
        <td><button className='btn btn--danger' onClick={buttonOnClick} type='button'>Delete Story</button></td>
    </tr>
    );
}
export default StoryListComponent;
