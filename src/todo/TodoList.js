import React, { Component } from 'react';
import TodoLabel from './TodoLabel.js';
import API from '../util/api.js';

import './todolist.css';

class TodoLsit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			todo: [{
				key: 1548577424000,
				parentKey: null,
				isComplete: false,
				title:'todo1',
				desc: 'todo desc1',
				children:[{
					key: 1548577424010,
					parentKey: 1548577424000,
					isComplete: false,
					title:'todo1-child1',
					desc: 'todo1-child1 desc1',
					children:[{
						key: 1548577424100,
						parentKey: 1548577424010,
						isComplete: false,
						title:'todo1-child1-child1',
						desc: 'todo1-child1-child1 desc1',
						children:[{
							key: 1548577425000,
							parentKey: 1548577424100,
							isComplete: false,
							title:'todo1-child1-child1-child1',
							desc: 'todo1-child1-child1-child1 desc1',
							children:[{
								key: 1548577435000,
								parentKey: 1548577425000,
								isComplete: false,
								title:'todo1-child1-child1-child1-child1',
								desc: 'todo1-child1-child1-child1-child1 desc1',
								children:[],
							}],
						}],
					}],
				}],
			},{
				key: 1548577424001,
				parentKey: null,
				isComplete: false,
				title:'todo2',
				desc: 'todo desc2',
				children:[],
			},{
				key: 1548577424002,
				parentKey: null,
				isComplete: false,
				title:'todo3',
				desc: 'todo desc3',
				children:[],
			},{
				key: 1548577424003,
				parentKey: null,
				isComplete: false,
				title:'todo3',
				desc: 'todo desc3',
				children:[],
			}],
		};
		this.loadTodo = this.loadTodo.bind(this);
		this.saveTodo = this.saveTodo.bind(this);

		
		this.searchTodoByKey = this.searchTodoByKey.bind(this);
		this.setTodoTitle = this.setTodoTitle.bind(this);
		this.setTodoDesc = this.setTodoDesc.bind(this);
		this.labelAddChild = this.labelAddChild.bind(this);
		this.labelRemoveThis = this.labelRemoveThis.bind(this);
		this.labelSetCompleteValue = this.labelSetCompleteValue.bind(this);
		this.checkChildrenIsAllCompleted = this.checkChildrenIsAllCompleted.bind(this);
		
	}

	componentDidMount() {
		this.loadTodo();
	}

	loadTodo(){
		API.loadTodo().then(data => {
			console.log(data);
			this.setState({todo: data.data});
		})
	}

	saveTodo(){
		let {todo} = this.state;
		API.saveTodo(todo).then(data => {
			console.log(data);
			if(data.code === 0)
				alert('保存成功~');
		})
	}

	searchTodoByKey(key, todo){
		if(!todo) todo = this.state.todo;
		for(let i = 0; i < todo.length; i++){
			if(todo[i].key === key){ return todo[i];}
			else{
				if(todo[i].children.length > 0){
					let todoObj = this.searchTodoByKey(key, todo[i].children);
					if(todoObj){
						// console.log(todoObj);
						return todoObj;
					}
				}
			}
		}
		return null;
	}

	setTodoTitle(key, title){
		let todo = this.searchTodoByKey(key);
		todo.title = title;
		this.setState({todo: this.state.todo});
	}
	
	setTodoDesc(key, desc){
		let todo = this.searchTodoByKey(key);
		todo.desc = desc;
		this.setState({todo: this.state.todo});
	}

	labelAddChild(key){
		let newKey = Date.parse(new Date())+parseInt(Math.random() * 1000);
		console.log(newKey);
		let parentTodo = this.searchTodoByKey(key);
		parentTodo.children.push({
			key: newKey,
			parentKey: key,
			isComplete: false,
			title:'新建todo',
			desc: '新建todo desc',
			children:[],
		})
		this.setState({todo: this.state.todo});
	}

	labelRemoveThis(key){
		let todo = this.searchTodoByKey(key);
		let parentKey = todo.parentKey;
		let parentTodo = this.searchTodoByKey(parentKey);
		if(!parentTodo){
			parentTodo = {};
			parentTodo.children = this.state.todo;
		}
		let index;
		for(let i = 0; i < parentTodo.children.length; i++){
			if(parentTodo.children[i].key === key){
				index = i;
			}
		}
		parentTodo.children.splice(index,1);
		this.setState({todo: this.state.todo});
	}

	labelSetCompleteValue(key, bool){
		let todo = this.searchTodoByKey(key);
		if(bool === true){// bool只允许是true和false
			todo.isComplete = true;
		}else{
			todo.isComplete = false;
		}
		
		if(this.checkChildrenIsAllCompleted(todo.parentKey)){ // 如果这个元素的父对象也查询到子对象全部完成了
			this.labelSetCompleteValue(todo.parentKey, true); // 递归调用，设定父对象也为“已完成”
		}
		this.setState({todo: this.state.todo});
	}

	checkChildrenIsAllCompleted(parentKey){
		let parentTodo = this.searchTodoByKey(parentKey);
		if(!parentTodo) return false;
		for(let i = 0; i < parentTodo.children.length; i++ ){
			if(!parentTodo.children[i].isComplete) return false;
		}
		return true;
	}



	render() {
		console.log(this.state.todo);
		return (
			<div className="main">
				<div className="todoLabelWrap">
					{this.state.todo.map((item, index)=>{
						// console.log(item);
						return (
							<TodoLabel 
								key={item.key}
								keyValue={item.key}
								searchTodoByKey = {this.searchTodoByKey}
								setTodoTitle = {this.setTodoTitle}
								setTodoDesc = {this.setTodoDesc}
								labelAddChild = {this.labelAddChild}
								labelRemoveThis = {this.labelRemoveThis}
								labelSetCompleteValue = {this.labelSetCompleteValue}

								title={item.title}
								desc={item.desc}
								isComplete={item.isComplete}
								children={item.children}
								marginLeft={0}
								perMarginLeft={40}
								fontSize={32}
								perFontSize={4}
							/>
						);
					})}
				</div>
				<div className="divact save-btn" onClick={() => {this.saveTodo()}}>保存</div>
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

