import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

    renderField(field) {

        const {meta: {touched, error} } = field;

        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label> {field.label} </label>
                <input 
                    className="form-control text-help"
                    type="text"
                    placeholder={field.placeholder}
                    {...field.input}
                />
                <div className="text-help"> 
                    {touched ? error : ''}
            
                </div>
            </div>
        )
    }

    onSubmit(values) {

        console.log(values);
        
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });

    }

    render() {
        const { handleSubmit } = this.props;
        return ( 
        <div>
           <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                label="Title for Post"
                name="title"
                placeholder =" Enter Post Title here"
                component={this.renderField}
                />
                <Field 
                label="Categories"
                name="categories"
                placeholder="Enter categories name here"
                component={this.renderField}
                />
                <Field 
                label="Post Content"
                name="content"
                placeholder="Enter some text content here"
                component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/"className="btn btn-danger">Cancel </Link>
           </form>
        </div>
        );
    }
}


function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = "Enter a title";
    }
    // if (values.title.length < 3 ) {
    //     errors.title = "Enter a title at least 3 characters";
    // }

    if(!values.categories) {
        errors.categories = "Enter some categories";
    }

    if(!values.content) {
        errors.content = "Enter some content please";
    }

    return errors;

}

export default reduxForm({
    validate, // validate: validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost}) (PostsNew)
);