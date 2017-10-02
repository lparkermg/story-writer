import React from 'react';
import createReactClass from 'create-react-class';
import Api from '../api/api';

const StoryItemComponent = createReactClass({
    getInitialState: function(){
        return {
            story: null,
            loadingStory: true
        };
    },
    componentDidMount: function(){
        this._init(this.props);
    },
    componentWillReceiveProps: function(newProps){
        this._init(newProps);
    },
    _init: function(props){
        Api.getStory(props.match.params.storyId).then(res => {
            this.setState({story: res.data, loadingStory: false});
        }, err => {
            alert(err);
        });
    },
    _goBack:function(){
        this.props.history.push('/');
    },
    render: function(){
        const titlebar = (
            <div className='title-bar'>
                Story
                <div className='title-options right'>
                    <button className='btn' onClick={this._goBack}>Back</button>
                </div>
            </div>
        )
        if(this.state.loadingStory){
            return (
                <div>
                    {titlebar}
                    Loading story, please wait...
                </div>
            );
        }
        else {
            return (
                <div>
                    {titlebar}
                    <table className='table__showstory'>
                        <thead>
                            <tr>
                                <th>{this.state.story.title}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='content-wrap'>{this.state.story.content}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    }
});

export default StoryItemComponent;
