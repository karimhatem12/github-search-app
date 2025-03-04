import { Routes } from '@angular/router';
import { UserListComponent } from './modules/user-list/user-list.component';
import { UserRepoComponent } from './modules/user-repo/user-repo.component';

export const routes: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users', component: UserListComponent },
    { path: 'users/:name', component: UserRepoComponent },
];
