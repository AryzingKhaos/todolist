import React, { Component } from 'react';
import TodoLabel from './TodoLabel.js';

import './todolist.css';

class TodoLsit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			todo: [{
				key: 1548577424000,
				isComplete: false,
				title:'todo1',
				desc: 'todo desc1',
				children:[{
					key: 1548577424005,
					isComplete: false,
					title:'todo1-child1',
					desc: 'todo1-child1 desc1',
					children:[],
				}],
			},{
				key: 1548577424001,
				isComplete: false,
				title:'todo2',
				desc: 'todo desc2',
				children:[],
			},{
				key: 1548577424002,
				isComplete: false,
				title:'todo3',
				desc: 'todo desc3',
				children:[],
			},{
				key: 1548577424003,
				isComplete: false,
				title:'todo3',
				desc: 'todo desc3',
				children:[],
			}],
		};
		this.labelFocus = this.labelFocus.bind(this);
		this.labelBlur = this.labelBlur.bind(this);
		this.labelClickAddChild = this.labelClickAddChild.bind(this);
		this.labelClickRemove = this.labelClickRemove.bind(this);
	}

	componentDidMount() {
		
	}

	labelFocus(){}

	labelBlur(){}

	labelClickAddChild(){}

	labelClickRemove(){}

	render() {
		console.log(this.state.todo);
		return (
			<div className="main">
				<div>
					{this.state.todo.map((item, index)=>{
						console.log(item);
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
						);
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
export default TodoLsit;

