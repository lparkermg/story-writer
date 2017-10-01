import React from 'react';
import createReactClass from 'create-react-class';

import Api from '../api/api';

const StoryListComponent = createReactClass({
    getInitialState: function(){
        return {
            stories: [],
            loadedStories: false,
            showingNewStory: false,
            editorTitle:"",
            editorContent:"",
            editingId: null
        };
    },
    componentDidMount: function(){
        this._init(this.props);
    },
    componentWillReceiveProps: function(newProps){
        this._init(newProps);
    },
    _init: function(props){
        this.setState({stories: [], loadedStories: false,editorTitle: "", editorContent:"",editingId:null});
        this._loadStories();
    },
    _loadStories: function(){
        Api.getStories().then(res =>
        {
            this.setState({stories: res.data, loadedStories:true});
            console.log(this.state.stories);
        },err => {
            alert(err);
        });
        //Load Stoies here!
    },
    _saveStory: function(){
        //Save new story here.
        var content = this.state.editorContent;
        var title = this.state.editorTitle;
        var id = this.state.editingId;
        if(id === null){
            var story = {
                title:title,
                content: content
            }
            Api.postStory(story).then(res => {
                //TODO: Add story reloading and show a message
                this._loadStories();
            },err => {
                //TODO: Show a message
                alert(err);

            });
        }
        else {
            var story = {
                id:id,
                title:title,
                content:content
            }
            Api.putStory(id,story).then(res =>{
                //TODO: Add story reloading and show a message.
                this._init(this.props);
            },err => {
                alert(err);
            });
        }
        console.log(story);
    },
    _deleteStory: function(id){
        Api.deleteStory(id).then(res => {
            this._init(this.props);
        },err => {
            alert(err)
        })
    },
    _makeStoryLine: function(story){
        return <StoryLine key={story.id} story={story} buttonOnClick={() => this._deleteStory(story.id)}/>
    },
    _toggleNewStory: function(){
        var newStory = this.state.showingNewStory;
        this.setState({showingNewStory: !newStory});
    },
    render: function(){
        const storyLines = this.state.stories.map(s => {
            const line = [this._makeStoryLine(s)];
            return line;
        });
        return (
            <div>
                <div className='title-bar'>
                    Story list
                    <div className='title-options right'>
                        <button className='btn' onClick={this._toggleNewStory}>{this.state.showingNewStory ? 'Hide Editor' : 'Show Editor'}</button>
                    </div>
                </div>
                {this.state.showingNewStory &&
                (<table className='table__newstory'>
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
                            <td><input id='content-box' className='input-title' onChange={e => this.setState({editorTitle: e.target.value})} type='text'/></td>
                        </tr>
                        <tr>
                            <td>Content (Between 150 ~ 500 Words):</td>
                        </tr>
                        <tr>
                            <td><textarea className='input-content' onChange={e => this.setState({editorContent: e.target.value})} name='content' rows='10'/></td>
                        </tr>
                        <tr>
                            <td className='submit-row'><button className='btn btn--primary submit-button' onClick={this._saveStory} type='button'>Submit</button></td>
                        </tr>
                        <tr>
                            <td />
                        </tr>
                    </tbody>
                </table>)}
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
        <td><div className='content-wrap'>{story.content}</div></td>
        <td><button className='btn btn--danger' onClick={buttonOnClick} type='button'>Delete Story</button></td>
    </tr>
    );
}
export default StoryListComponent;
