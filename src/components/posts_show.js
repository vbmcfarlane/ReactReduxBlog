import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
    componentDidMount() {

        // option 1: check to see if records exist. do nothing if exists
        // if (!this.props.post) { 
        //     const { id } = this.props.match.params;
        //     this.props.fetchPost(id);
        // }

        // option 2:    
        //Re-reads the records even if they already exist. Deals with data that's constantly updated 
        const { id } = this.props.match.params;
            this.props.fetchPost(id);
            console.log('this.props.fetchPost(id)= ',this.props.fetchPost(id) );
        
    }

    onDeleteClick(){
        const { id } = this.props.match.params;

        this.props.deletePost(id, () => {

            // returns to main page after the delete is done
            this.props.history.push('/');
        }); 
    }

    render() { 
        const { post } = this.props;

            if(!post) {
                return <div> Loading...</div>
            }

        return (
        <div>
            <Link  to="/">Back to Index</Link>
            <button className="btn btn-danger pull-xs-right"
                onClick={this.onDeleteClick.bind(this)}
            >
                Delete Post
            </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content} </p>
        </div>
        );
    }
}

function  mapStateToProps({ posts }, ownProps) {
    return { post: posts[ownProps.match.params.id] };
   
} 
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);