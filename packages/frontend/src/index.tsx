import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import { client } from './apollo/client';
import { App } from './components/App';
import { reducers } from './store/reducers/main.reducers';

const composeEnhancers =
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>,
    document.querySelector('#root')
);
