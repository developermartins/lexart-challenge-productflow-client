import ReactDOM from 'react-dom/client'
import App from './App'
import Login from './pages/Login';
import Home from './pages/Home';
import Post from './pages/Post';
import AddProject from './pages/AddProduct';
import CreateAccount from './pages/CreateAccount';
import storage from 'redux-persist/lib/storage';
import authReducer from './state/state';
import PrivateRoutes from './components/PrivateRoutes';

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
        element: <PrivateRoutes />,
        children: [
          {
            path: '/home',
            element: <Home />
          },
          {
            path: '/post-preview/post/:id',
            element: <Post />
          },
          {
            path: '/write-project',
            element: <AddProject />
          },
          {
            path: '/product-preview/product/:id',
            element: <AddProject />
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
