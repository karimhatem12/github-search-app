import { GithubService } from './../../shared/services/github.service';
import { TableModule } from 'primeng/table';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { Tooltip } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { SearchComponent } from '../search/search.component';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-repo',
  imports: [SearchComponent, TableModule, CommonModule, ProgressSpinnerModule, FooterComponent, ToastModule, Tooltip, DialogModule],
  templateUrl: './user-repo.component.html',
  styleUrl: './user-repo.component.scss'
})
export class UserRepoComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private githubService = inject(GithubService);

  columns = [
    { field: 'full_name', header: 'Full Name', sortable: true },
    { field: 'created_at', header: 'Created at', sortable: true },
    { field: 'updated_at', header: 'Updated', sortable: true },
    { field: 'pushed_at', header: 'Pushed', sortable: true },
    { field: 'watchers', header: 'Watchers', sortable: false },
    { field: 'open_issues', header: 'Open Issues', sortable: false },
    { field: 'description', header: 'Description', sortable: false }
  ];

  repo: any[] = [];
  page: number = 1;
  perPage: number = 10;
  totalPages: number = 1;
  sort: string = 'created_at';
  userName: string = '';

  private queryParams$ = new BehaviorSubject<{ page: number; perPage: number; sort: string }>({
    page: this.page,
    perPage: this.perPage,
    sort: this.sort
  });

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        if (params['name']) {
          this.userName = params['name'];
          return this.queryParams$.pipe(
            switchMap(query => this.githubService.getUserRepositories(this.userName, query.page, query.perPage, query.sort))
          );
        }
        return [];
      })
    ).subscribe(res => {
      this.repo = res.slice(0, this.perPage);
      this.totalPages = Math.ceil(res.length / this.perPage);
    });
  }

  getTotalPages(): number {
    return this.totalPages || 1;
  }

  sortby(column: string) {
    if (this.sort !== column) {
      this.sort = column;
      this.updateQueryParams();
    }
  }

  onFooterChange(event: any) {
    if (event.pageNumber && event.pageSize) {
      this.page = event.pageNumber;
      this.perPage = event.pageSize;
      this.updateQueryParams();
    }
  }

  private updateQueryParams() {
    this.queryParams$.next({ page: this.page, perPage: this.perPage, sort: this.sort !== 'full_name' ? this.sort.split('_')[0] : this.sort });
  }
}
