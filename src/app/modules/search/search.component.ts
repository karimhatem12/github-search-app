import { FormsModule } from '@angular/forms';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { searchUsers } from '../../store/github/user.actions';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  query = '';

  @Input() hideSearch: boolean = false

  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['query']) {
        this.query = params['query'];
        this.search();
      }
    });
  }

  search() {
    this.router.navigate([], {
      queryParams: { query: this.query.trim() },
      queryParamsHandling: 'merge'
    });
    if (this.query.trim()) {
      this.store.dispatch(searchUsers({ query: this.query.trim(), page: 1, perPage: 10 }));
    }
  }

  goToUserList() {
    this.router.navigate(['/']);
  }
}