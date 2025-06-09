import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import graphReducer from './slices/graphSlice';


const rootReducer = combineReducers({
    graph: graphReducer,
});


export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
