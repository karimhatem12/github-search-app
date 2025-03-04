import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export interface UserState {
    usersList: any;
    loader: boolean;
    error: string | null;
}

const initialState: UserState = {
    usersList: null,
    loader: false,
    error: null
};

export const userReducer = createReducer(
    initialState,

    on(UserActions.searchUsers, (state) => ({
        ...state,
        loader: true,
        error: null
    })),

    on(UserActions.searchUsersSuccess, (state, { users }) => ({
        ...state,
        usersList: users,
        loader: false,
        error: null
    })),

    on(UserActions.searchUsersFailure, (state, { error }) => ({
        ...state,
        loader: false,
        error
    }))
);
