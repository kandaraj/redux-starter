import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends React.Component {

	constructor(props, context){
		super(props, context);
		this.state = {
			course: {
				title: ""
			}
		};
		this.onTitleChange = this.onTitleChange.bind(this);
		this.onSaveTitle = this.onSaveTitle.bind(this);
	}
	
	onTitleChange(event) {
		const course = this.state.course;
		course.title = event.target.value;
		this.setState({course: course});
	}

	onSaveTitle(){
		this.props.createCourse(this.state.course);
	}

	courseRow(course, index) {
		return <div key={index}>{course.title}</div>;
	}

	render(){
		return (
			<div>
				<h1>Courses</h1>
				{this.props.courses.map(this.courseRow)}
				<input type="text" onChange={this.onTitleChange} value={this.state.course.title} />
				<input type="submit" onClick={this.onSaveTitle} value="Save" />
			</div>
		);
	}

}

CoursesPage.propTypes = {
	courses: PropTypes.array.isRequired,
	createCourse: PropTypes.func.isRequired
};

const mapStateToProps = function(state, ownProps){
	"use strict";
	return {
		courses: state.courses
	};
};

const mapDispatchToProps = function(dispatch){
	"use strict";
	return {
		createCourse: course => {dispatch(courseActions.createCourse(course))}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);