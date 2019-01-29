import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TodoList from './todo/TodoList.js';
import './base.css'

// import store from './reducers/store.js';

ReactDOM.render(
	// <Provider store={store}>
	// 	{/*<Routes />*/}
	// 	<TodoList />
	// </Provider>,
	<div>
		<TodoList />
	</div>,
	document.getElementById('root')
);


