import React, { Component } from 'react';
import API from '../util/api.js';
import {Link} from 'react-router-dom';
import SelfAdaptionPopup from '../component/SelfAdaptionPopup.js';

import './common.css';
import './HomeList.css';

class HomeList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			list:[{
				id: 1,
				name: '项目1',
				imageClass: '1',
			},{
				id: 2,
				name: '项目2',
				imageClass: '2',
			},{
				id: 3,
				name: '项目3',
				imageClass: '3',
			},{
				id: 4,
				name: '项目4',
				imageClass: '4',
			},{
				id: 5,
				name: '项目5',
				imageClass: '5',
			},],
			isShowNewTodo: false,
		};
		this.loadHomeList = this.loadHomeList.bind(this);
	}

	componentDidMount() {
		this.loadHomeList();
	}

	loadHomeList(){
		API.getHomeList().then((data) => {
			console.log(data.data);
			this.setState({list: data.data});
		})
	}


	render() {
		let newTodoFormArr = [
			{
				title: '标题',
				placeHolder: '请输入列表标题',
				type: 'input'
			},{
				title: '描述',
				placeHolder: '请输入列表描述',
				type: 'input'
			}
		]

		return (
			<div className="main">
				<div className="list-box clearfix">
					{this.state.list.map((item, index) => {
						return (
							<Link to={'/todo/'+item.id} key={item.id} className={"divact list-one img"+item.imageClass}>
								<div className="mask"></div>
								<div className="text">{item.name}</div>
							</Link>
						)
					})}
				</div>
				<div className="btnbox">
					<div className="divact btn add-todo-list-btn" onClick={() => {this.newTodo()}}>新增TodoList</div>
				</div>
				{
					this.state.isShowNewTodo ?
					(<SelfAdaptionPopup 
						title="新建todo列表"
						formArr={newTodoFormArr}
					/>) :
					null
				}
			</div>
		);
	}
}

export default HomeList;

