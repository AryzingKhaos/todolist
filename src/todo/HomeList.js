import React, { Component } from 'react';
import API from '../util/api.js';
import {Link} from 'react-router-dom';

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
		};
		this.loadHomeList = this.loadHomeList.bind(this);
	}

	componentDidMount() {
		this.loadHomeList();
	}

	loadHomeList(){
	}


	render() {

		return (
			<div className="main">
				<div className="list-box clearfix">
					{this.state.list.map((item, index) => {
						return (
							<Link to={'/todo/'+item.id} className={"divact list-one img"+item.imageClass}>
								<div className="mask"></div>
								<div className="text">{item.name}</div>
							</Link>
						)
					})}
				</div>
			</div>
		);
	}
}

export default HomeList;

