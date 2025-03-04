import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { UserEffects } from './user.effects';
import * as UserActions from './user.actions';
import { GithubService } from '../../shared/services/github.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { Actions } from '@ngrx/effects';

describe('UserEffects', () => {
    let effects: UserEffects;
    let actions$ = new Actions();
    let githubService: jasmine.SpyObj<GithubService>;

    beforeEach(() => {
        const githubServiceMock = jasmine.createSpyObj('GithubService', ['searchUsers']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                UserEffects,
                provideMockActions(() => actions$),
                provideMockStore(),
                { provide: GithubService, useValue: githubServiceMock }
            ]
        });

        effects = TestBed.inject(UserEffects);
        githubService = TestBed.inject(GithubService) as jasmine.SpyObj<GithubService>;
    });

    it('should call searchUsers API and dispatch searchUsersSuccess', () => {
        const action = UserActions.searchUsers({ query: 'test', page: 1, perPage: 10 });
        const response = { items: [{ login: 'testUser' }], total_count: 1 };

        githubService.searchUsers.and.returnValue(of(response));
        actions$ = of(action);

        effects.searchUsers$.subscribe((result) => {
            expect(result).toEqual(UserActions.searchUsersSuccess({ users: response }));
            expect(githubService.searchUsers).toHaveBeenCalledWith('test', 1, 10);
        });
    });

    it('should dispatch searchUsersFailure on API failure', () => {
        const action = UserActions.searchUsers({ query: 'test', page: 1, perPage: 10 });
        const error = 'API error';

        githubService.searchUsers.and.returnValue(throwError(() => new Error(error)));
        actions$ = of(action);

        effects.searchUsers$.subscribe((result) => {
            expect(result).toEqual(UserActions.searchUsersFailure({ error }));
        });
    });
});
