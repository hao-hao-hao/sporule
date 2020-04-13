import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import initialState from "./reducers/InitialState";
// import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import { PersistGate } from 'redux-persist/integration/react';
import * as PostAction from "./actions/PostAction";
import App from './pages/App';
import "./styles/styles.css";

// if ('serviceWorker' in navigator) {
// OfflinePluginRuntime.install({
//     onUpdateReady: () => {
//         OfflinePluginRuntime.applyUpdate();
//     },
//     onUpdated: () => {
//         window.location.reload();
//     }
// });
// }

// Check that service workers are supported
if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(reg => {
            reg.addEventListener('updatefound', () => {
                let insworker = reg.installing;
                insworker.addEventListener('statechange', () => {
                    if (insworker.state == 'installed') {
                        //reload window or show ui for refreshing the app
                        window.location.reload();
                    }
                });
            });
        });
    });
}

export const { store, persistor } = configureStore(initialState);

setTimeout(() => {
    const states = store.getState();
    if (states.posts.items[0].title == "") {
        //load posts if the current list is empty
        store.dispatch(PostAction.loadPosts());
    }
}, 1000);



render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('app')
);

