import React, { Component } from 'react';

import "./todolist.css";

class TodoLabel extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showContent: false,
		};
	}

	componentDidMount() {
		
	}

	render() {
		const {title, desc, isComplete, children} = this.props;
		const {onFocus, onBlur, onClickAddChild, onClickRemove} = this.props;
		console.log(title);
		return (
			<div className="todolabel">
				<div className="title" onClick={()=> {
					this.setState({showContent: !this.state.showContent})
				}} alt="双击编辑">{title}</div>
				<div className={"desc"+(this.state.showContent ? ' show' :'')}>{desc}</div>
				<div className="add-child">+</div>
				<div></div>
				<div className="children">
					{children && children.length && children.map((item, index) => {
						return (
							<TodoLabel 
								key={item.key}
								// onFocus={(label) => {this.labelFocus(label)}}
								// onBlur={(label) => {this.labelBlur(label)}}
								// onClickAddChild={(label) => {this.labelClickAddChild(label)}}
								// onClickRemove={(label) => {this.labelClickRemove(label)}}
								title={item.title}
								desc={item.desc}
								isComplete={item.isComplete}
								children={item.children}
							/>
						)
					})}
				</div>
			</div>
		);
	}
}

// const mapStateToProps = (state) => {
// 	return {
// 	}
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 	}
// }

// export default connect(mapStateToProps, mapDispatchToProps)(TodoLsit);
export default TodoLabel;

