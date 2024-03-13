import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './redux/slices/counterSlice';
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
	reducer: {
		counterReducer
	}
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useTypedDispatch = useDispatch.withTypes<AppDispatch>();
export const useTypedSelector = useSelector.withTypes<RootState>();