import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GithubService } from '../../shared/services/github.service';

@Injectable()
export class UserEffects {
    private actions$ = inject(Actions);
    private githubService = inject(GithubService);

    searchUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.searchUsers),
            mergeMap(action =>
                this.githubService.searchUsers(action.query, action.page, action.perPage).pipe(
                    map(users => UserActions.searchUsersSuccess({ users })),
                    catchError(error => {
                        console.error('Error:', error);
                        return of(UserActions.searchUsersFailure({ error: error.message }));
                    })
                )
            )
        )
    );
}
