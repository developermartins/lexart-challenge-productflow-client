import ReactDOM from 'react-dom/client'
import App from './App'
import Login from './pages/Login';
import Home from './pages/Home';
import Post from './pages/Post';
import WritePost from './pages/WritePost';
import WriteProject from './pages/WriteProject';
import Project from './pages/Project';
import Bio from './pages/Bio';
import CreateAccount from './pages/CreateAccount';
import RecoverAccount from './pages/RecoverAccount';
import storage from 'redux-persist/lib/storage';
import authReducer from './state/state';
import PrivateRoutes from './components/PrivateRoutes';
import AccountPassword from './pages/AccountPassword';
import AccountInfo from './pages/AccountInfo';

import './index.css';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const persistConfig = { key: 'root', storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    },
  }),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: '/create-account',
        element: <CreateAccount />
      },
      {
        path: '/recover-account',
        element: <RecoverAccount />
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: '/home',
            element: <Home />
          },
          {
            path: '/post-preview/draft/:id',
            element: <Post />
          },
          {
            path: '/post-preview/post/:id',
            element: <Post />
          },
          {
            path: '/write-post',
            element: <WritePost />
          },
          {
            path: '/update/update-post/:id',
            element: <WritePost />
          },
          {
            path: '/write-project',
            element: <WriteProject />
          },
          {
            path: '/update/update-project/:id',
            element: <WriteProject />
          },
          {
            path: '/project-preview/project/:id',
            element: <Project />
          },
          {
            path: '/bio',
            element: <Bio />
          },
          {
            path: '/settings/account/password/update',
            element: <AccountPassword />
          },
          {
            path: '/settings/account/info/update',
            element: <AccountInfo />
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={ store }>
    <PersistGate loading={ null } persistor={persistStore(store)}>
      <RouterProvider router={ router } />
    </PersistGate>
  </Provider>,
);
