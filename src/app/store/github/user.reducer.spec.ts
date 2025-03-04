import { userReducer, UserState } from './user.reducer';
import * as UserActions from './user.actions';

describe('User Reducer', () => {
    const initialState: UserState = { usersList: null, loader: false, error: null };

    it('should set loader to true when searchUsers is dispatched', () => {
        const newState = userReducer(initialState, UserActions.searchUsers({ query: 'ahmed', page: 1, perPage: 10 }));
        expect(newState.loader).toBe(true);
    });

    it('should update usersList and stop loader on searchUsersSuccess', () => {
        const usersMock = { items: [{ login: 'testUser' }], total_count: 1, perPage: 10  };
        const newState = userReducer(initialState, UserActions.searchUsersSuccess({ users: usersMock }));
        expect(newState.usersList).toEqual(usersMock);
        expect(newState.loader).toBe(false);
    });

    it('should set error and stop loader on searchUsersFailure', () => {
        const newState = userReducer(initialState, UserActions.searchUsersFailure({ error: 'API error' }));
        expect(newState.error).toBe('API error');
        expect(newState.loader).toBe(false);
    });
});
