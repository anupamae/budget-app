import { configureStore } from '@reduxjs/toolkit';
import { saveState, transactionReducer } from './Reducer';

export const store = configureStore({ reducer: transactionReducer });

store.subscribe(() => {
  saveState(store.getState().list);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
