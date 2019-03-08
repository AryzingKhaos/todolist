import React, { Component } from 'react';
import TodoLabel from './TodoLabel.js';
import API from '../util/api.js';

import './common.css';
import './TodoList.css';

class TodoLsit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isArrange: false, // 是否整理
			todo: [{
				key: 1548577424000,
				parentKey: null,
				isComplete: false,
				completedTime: 1548577424000,
				title:'todo1',
				desc: 'todo desc1',
				children:[{
					key: 1548577424010,
					parentKey: 1548577424000,
					isComplete: false,
					completedTime: 1548577424000,
					title:'todo1-child1',
					desc: 'todo1-child1 desc1',
					children:[{
						key: 1548577424100,
						parentKey: 1548577424010,
						isComplete: false,
						completedTime: 1548577424000,
						title:'todo1-child1-child1',
						desc: 'todo1-child1-child1 desc1',
						children:[{
							key: 1548577425000,
							parentKey: 1548577424100,
							isComplete: false,
							completedTime: 1548577424000,
							title:'todo1-child1-child1-child1',
							desc: 'todo1-child1-child1-child1 desc1',
							children:[{
								key: 1548577435000,
								parentKey: 1548577425000,
								isComplete: false,
								completedTime: 1548577424000,
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
				completedTime: 1548577424000,
				title:'todo2',
				desc: 'todo desc2',
				children:[],
			},{
				key: 1548577424002,
				parentKey: null,
				isComplete: false,
				completedTime: 1548577424000,
				title:'todo3',
				desc: 'todo desc3',
				children:[],
			},{
				key: 1548577424003,
				parentKey: null,
				isComplete: false,
				completedTime: 1548577424000,
				title:'todo3',
				desc: 'todo desc3',
				children:[],
			}],
		};
		this.loadTodo = this.loadTodo.bind(this);
		this.newTodo = this.newTodo.bind(this);
		this.saveTodo = this.saveTodo.bind(this);
		this.arrangeTodo = this.arrangeTodo.bind(this);

		this.searchTodoByKey = this.searchTodoByKey.bind(this);
		this.setTodoTitle = this.setTodoTitle.bind(this);
		this.setTodoDesc = this.setTodoDesc.bind(this);
		this.labelAddChild = this.labelAddChild.bind(this);
		this.labelRemoveThis = this.labelRemoveThis.bind(this);
		this.labelSetCompleteValue = this.labelSetCompleteValue.bind(this);
		this.checkChildrenIsAllCompleted = this.checkChildrenIsAllCompleted.bind(this);
		this.labelSetParentsCompletedValue = this.labelSetParentsCompletedValue.bind(this);
		this.labelSetChildrenCompletedValue = this.labelSetChildrenCompletedValue.bind(this);
		
	}

	componentDidMount() {
		this.loadTodo();
		// this.setState({isArrange: true});
	}

	loadTodo(){
		API.loadTodo().then(data => {
			console.log(data);
			this.setState({todo: data.data});
		})
	}

	newTodo(){
		let newKey = Date.parse(new Date())+parseInt(Math.random() * 1000);
		console.log(newKey);
		let parentKey = null;
		this.state.todo.push({
			key: newKey,
			parentKey: parentKey,
			isComplete: false,
			title:'新建todo',
			desc: '描述;',
			children:[],
		})
		this.setState({todo: this.state.todo});
	}

	saveTodo(){
		let {todo} = this.state;
		API.saveTodo(todo).then(data => {
			console.log(data);
			if(data.code === 0)
				alert('保存成功~');
		})
	}

	arrangeTodo(){
		this.setState({isArrange: !this.state.isArrange});
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
			desc: '描述',
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
		// console.log('执行labelSetCompleteValue'+key);
		let todo = this.searchTodoByKey(key);
		if(!todo) return;
		bool === true ? (todo.isComplete = true) :  (todo.isComplete = false);
		
		// 这里做双向延伸，如果当前的todo完成了，那么去设置父todo完成
		// 由labelSetParentsCompleteValue判断当前的todo的父todo是否完成
		// 同时，向子todo延伸，由labelSetChildrenCompletedValue判断当前todo的子todo是否完成
		// 如果完成，那么向子todo延伸
		this.labelSetParentsCompletedValue(key, bool);
		this.labelSetChildrenCompletedValue(todo.children, bool);

		this.setState({todo: this.state.todo});
	}

	// 设置父todo的是否完成值，并且只向父todo延伸
	labelSetParentsCompletedValue(key, bool){
		let todo = this.searchTodoByKey(key);
		if(!todo) return;
		// console.log(todo.title);
		bool === true ? (todo.isComplete = true) :  (todo.isComplete = false);
		if(bool === true && this.checkChildrenIsAllCompleted(todo.parentKey)){ // 如果这个元素的父对象也查询到子对象全部完成了
			this.labelSetParentsCompletedValue(todo.parentKey, true); // 递归调用，设定父对象也为“已完成”
		}else if(bool === false){ // 子对象未完成，那么所有上级都是未完成
			this.labelSetParentsCompletedValue(todo.parentKey, false);
		}
	}

	// 设置子todo的是否完成值，并且只向子todo延伸
	labelSetChildrenCompletedValue(children, bool){
		if(!children.length) return;
		for(let i = 0; i < children.length; i++){
			bool === true ? (children[i].isComplete = true) :  (children[i].isComplete = false);
			this.labelSetChildrenCompletedValue(children[i].children, bool); // 递归调用，设定子对象也为“已完成”
		}
	}

	// 判断当前todo的子对象是否都已经完成了
	checkChildrenIsAllCompleted(key){
		let todo = this.searchTodoByKey(key);
		if(!todo) return false;
		for(let i = 0; i < todo.children.length; i++ ){
			if(!todo.children[i].isComplete) return false;
		}
		// console.log(todo.title+' is completed!');
		return true;
	}



	render() {
		console.log(this.state.todo);
		let copyTodo = this.state.todo.concat([]);
		if(this.state.isArrange){
			copyTodo.sort(function(a, b){
				return a.isComplete - b.isComplete;
			})
		}
		return (
			<div className="main">
				<div className="todoLabelWrap">
					{copyTodo.map((item, index)=>{
						// console.log(item);
						return (
							<TodoLabel 
								// 主要数据
								key={item.key}
								keyValue={item.key}
								isComplete={item.isComplete}
								children={item.children}
								isArrange={this.state.isArrange}

								// 方法
								searchTodoByKey = {this.searchTodoByKey}
								setTodoTitle = {this.setTodoTitle}
								setTodoDesc = {this.setTodoDesc}
								labelAddChild = {this.labelAddChild}
								labelRemoveThis = {this.labelRemoveThis}
								labelSetCompleteValue = {this.labelSetCompleteValue}

								// 文本
								title={item.title}
								desc={item.desc}

								// 样式
								marginLeft={0}
								perMarginLeft={40}
								fontSize={16}
								perFontSize={0}
							/>
						);
					})}
				</div>
				<div className="btnbox">
					<div className="divact btn new-btn" onClick={() => {this.newTodo()}}>新增Todo</div>
					<div className="divact btn arrange-btn" onClick={() => {this.arrangeTodo()}}>{this.state.isArrange ? '不整理' : '整理'}</div>
					<div className="divact btn save-btn" onClick={() => {this.saveTodo()}}>保存</div>
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

