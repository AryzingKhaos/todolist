import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {Router, Route, Switch, HashRouter} from 'react-router-dom';
import TodoList from './todo/TodoList.js';
import HomeList from './todo/HomeList.js';
import './base.css'

const {IndexRoute} = Route;

// import store from './reducers/store.js';

ReactDOM.render(
	// <Provider store={store}>
	// 	{/*<Routes />*/}
	// 	<TodoList />
	// </Provider>,
	<HashRouter>
		<div>
			<Route exact path='/' component={HomeList}></Route>
			<Route path='/todo/:id' component={TodoList}></Route>
		</div>
	</HashRouter>,
	document.getElementById('root')
);


