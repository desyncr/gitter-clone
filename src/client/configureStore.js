import { createStore, compose, applyMiddleware } from 'redux';
import thunk           from 'redux-thunk';
// import todoApp         from './reducers/';

function configureStore() {
  const middlewares = [thunk];

  return createStore(
    // todoApp,
    compose(
      applyMiddleware(...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
  );
}

export default configureStore;
