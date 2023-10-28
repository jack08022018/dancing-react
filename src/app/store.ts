import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import studentInfoReducer from '../pages/studentInfo/Slice';
import loginReducer from '../pages/login/Slice';

export const store = configureStore({
  reducer: {
    studentInfo: studentInfoReducer,
    loginPage: loginReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
