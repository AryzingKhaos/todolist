import React, { Component } from 'react';
import TodoLabel from './TodoLabel.js';
import API from '../util/api.js';
import util from '../util/util.js';

import './common.css';
import './TodoList.css';

class TodoLsit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isArrange: false, // 是否整理
			
			historyTodo:[],
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
		this.updateTodo = this.updateTodo.bind(this);
		this.undoTodo = this.undoTodo.bind(this);
		this.newTodo = this.newTodo.bind(this);
		this.saveTodo = this.saveTodo.bind(this);
		this.arrangeTodo = this.arrangeTodo.bind(this);
		this.labelHideThis = this.labelHideThis.bind(this);
		this.showAllTodo = this.showAllTodo.bind(this);
		this.setArrayAllValue = this.setArrayAllValue.bind(this);
		this.labelListThis = this.labelListThis.bind(this);

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

	editTodo = null; // 当前编辑的todo

	componentDidMount() {
		let id = this.props.match.params.id;
		console.log(id);
		this.loadTodo(id);
		// this.setState({isArrange: true});
	}

	loadTodo(id){
		API.loadTodo(id).then(data => {
			console.log(data);
			if(!data){
				this.setState({todo: []});
			}else{
				this.setState({todo: data.data});
			}
		})
	}

	updateTodo(){
		let {historyTodo} = this.state;
		let stateTodo = util.deepCopy(this.state.todo);
		historyTodo.push(stateTodo);
		console.log(historyTodo);
		// console.log(historyTodo[0][0].children[1].title);
		this.setState({
			historyTodo: historyTodo,
			todo: this.editTodo,
		})
	}

	// 撤销
	undoTodo(){
		let {historyTodo} = this.state;
		if(!historyTodo.length) return;
		let todo = historyTodo.pop();
		console.log(historyTodo, todo);
		this.setState({
			historyTodo: historyTodo,
			todo: todo,
		})
	}

	newTodo(){
		let newKey = Date.parse(new Date())+parseInt(Math.random() * 1000);
		console.log(newKey);
		let parentKey = null;
		this.state.todo.unshift({
			key: newKey,
			parentKey: parentKey,
			isComplete: false,
			title:'新建todo',
			desc: '创建于'+util.formatTime(new Date(newKey), "yyyy-MM-dd HH:mm:ss"),
			children:[],
		})
		this.setState({todo: this.state.todo});
	}

	saveTodo(){
		let id = this.props.match.params.id;
		let {todo} = this.state;
		API.saveTodo(id, todo).then(data => {
			console.log(data);
			if(data.code === 0)
				alert('保存成功~');
		})
	}

	arrangeTodo(){
		this.setState({isArrange: !this.state.isArrange});
	}

	searchTodoByKey(key, todo){
		if(!todo && this.editTodo){
			todo = this.editTodo;
		}else if(!todo && !this.editTodo){
			todo = this.state.todo;
		}
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
		this.editTodo = util.deepCopy(this.state.todo);
		let todo = this.searchTodoByKey(key, this.editTodo);
		todo.title = title;
		this.updateTodo();
	}
	
	setTodoDesc(key, desc){
		this.editTodo = util.deepCopy(this.state.todo);
		let todo = this.searchTodoByKey(key, this.editTodo);
		todo.desc = desc;
		this.updateTodo();
	}

	labelAddChild(key){
		this.editTodo = util.deepCopy(this.state.todo);
		let newKey = Date.parse(new Date())+parseInt(Math.random() * 1000);
		console.log(newKey);
		let parentTodo = this.searchTodoByKey(key, this.editTodo);
		parentTodo.isList = true;
		parentTodo.isComplete = false;
		parentTodo.children.unshift({
			key: newKey,
			parentKey: key,
			isComplete: false,
			title:'新建todo',
			desc: '描述',
			children:[],
		})
		this.updateTodo();
	}

	labelRemoveThis(key){
		this.editTodo = util.deepCopy(this.state.todo);
		let todo = this.searchTodoByKey(key, this.editTodo);
		let parentKey = todo.parentKey;
		let parentTodo = this.searchTodoByKey(parentKey, this.editTodo);
		if(!parentTodo){
			parentTodo = {};
			parentTodo.children = this.editTodo;
		}
		let index;
		for(let i = 0; i < parentTodo.children.length; i++){
			if(parentTodo.children[i].key === key){
				index = i;
			}
		}
		parentTodo.children.splice(index,1);
		this.updateTodo();
	}

	// 隐藏一个todo
	labelHideThis(key){
		this.editTodo = util.deepCopy(this.state.todo);
		let todo = this.searchTodoByKey(key, this.editTodo);
		if(!todo.isHide){
			todo.isHide = true;
		}
		this.updateTodo();
	}

	// 显示所有隐藏的todo
	showAllTodo(){
		this.editTodo = util.deepCopy(this.state.todo);
		this.setArrayAllValue(this.editTodo, 'isHide', false);
		this.updateTodo();
	}

	

	// 遍历数组，将所有的key属性都设置为value的值
	setArrayAllValue(array, key, value){
		for(let i = 0;  i < array.length; i++){
			array[i][key] = value;
			this.setArrayAllValue(array[i].children, key, value);
		}
	}

	// 显示该项的所有子项
	labelListThis(key){
		this.editTodo = util.deepCopy(this.state.todo);
		let todo = this.searchTodoByKey(key, this.editTodo);
		if(!todo.isList){
			todo.isList = true;
		}else{
			todo.isList = false;
		}

		this.updateTodo();
	}

	labelSetCompleteValue(key, bool){
		this.editTodo = util.deepCopy(this.state.todo);
		let todo = this.searchTodoByKey(key, this.editTodo);
		if(!todo) return;
		bool === true ? (todo.isComplete = true) :  (todo.isComplete = false);
		
		// 这里做双向延伸，如果当前的todo完成了，那么去设置父todo完成
		// 由labelSetParentsCompleteValue判断当前的todo的父todo是否完成
		// 同时，向子todo延伸，由labelSetChildrenCompletedValue判断当前todo的子todo是否完成
		// 如果完成，那么向子todo延伸
		this.labelSetParentsCompletedValue(key, bool);
		this.labelSetChildrenCompletedValue(todo.children, bool);

		this.updateTodo();
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
		if(!this.state.todo.length){
			return '无此todo';
		}
		let copyTodo = util.deepCopy(this.state.todo);
		if(this.state.isArrange){
			copyTodo.sort(function(a, b){
				return a.isComplete - b.isComplete;
			})
		}

		return (
			<div className="main">
				<div className="btnbox">
					<div className="divact btn new-btn" onClick={() => {this.newTodo()}}>新增Todo</div>
					<div className="divact btn arrange-btn" onClick={() => {this.arrangeTodo()}}>{this.state.isArrange ? '不整理' : '整理'}</div>
					<div className="divact btn save-btn" onClick={() => {this.saveTodo()}}>保存</div>
					<div className="divact btn save-btn" onClick={() => {this.showAllTodo()}}>显示全部</div>
					<div className="divact btn undo-btn" onClick={() => {this.undoTodo()}}>撤销</div>
				</div>
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
								isHide={item.isHide}
								isList={item.isList}

								// 方法
								searchTodoByKey = {this.searchTodoByKey}
								setTodoTitle = {this.setTodoTitle}
								setTodoDesc = {this.setTodoDesc}
								labelAddChild = {this.labelAddChild}
								labelRemoveThis = {this.labelRemoveThis}
								labelSetCompleteValue = {this.labelSetCompleteValue}
								labelHideThis = {this.labelHideThis}
								labelListThis = {this.labelListThis}

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

