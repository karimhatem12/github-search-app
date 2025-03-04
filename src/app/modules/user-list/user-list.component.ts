import { TableModule } from 'primeng/table';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { searchUsers } from '../../store/github/user.actions';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { Tooltip } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { SearchComponent } from '../search/search.component';
import { GithubUserSearchResponse } from '../../shared/models/github-user';

@Component({
  selector: 'app-user-list',
  imports: [SearchComponent, TableModule, CommonModule, ProgressSpinnerModule, FooterComponent, ToastModule, Tooltip, DialogModule, UserDetailsComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  users$: Observable<GithubUserSearchResponse> = inject(Store).pipe(select(state => state.users.usersList));
  loader$: Observable<boolean> = inject(Store).pipe(select(state => state.users.loader));

  page: number = 1
  perPage: number = 10
  search: string = ''

  showMoreDetails: boolean = false
  userName: string = ''

  constructor(private store: Store) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['query']) {
        this.search = params['query'];
      } else {

      }
    });
  }

  openUserProfile(url: string = '') {
    if (url) {
      window.open(url, '_blank');
    }
  }

  goToRepo(name: string) {
    this.router.navigate([`users/${name}`]);
  }

  getTotalPages(usersData: any): number {
    if (!usersData || !usersData.total_count) {
      return 1;
    }
    return Math.ceil(usersData.total_count / this.perPage);
  }

  onFooterChange(event: any) {
    if (event.pageNumber && event.pageSize) {
      this.page = event.pageNumber
      this.perPage = event.pageSize
      this.store.dispatch(searchUsers({ query: this.search.trim(), page: event.pageNumber, perPage: event.pageSize }));
    }
  }

  showDetails(name: string) {
    this.showMoreDetails = true
    this.userName = name
  }
}

