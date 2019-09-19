import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

const reducer = combineReducers({
});


// const middlewares = [];
// if (process.env.NODE_ENV !== 'production') {
//   middlewares.push(require('redux-immutable-state-invariant')());
// }

const storeEnhancers = compose(
	// applyMiddleware(...middlewares),
	// (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

// export default createStore(reducer, {}, storeEnhancers);
export default createStore(reducer, {});


