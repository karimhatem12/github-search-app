import { CommonModule } from '@angular/common';
import { GithubService } from './../../shared/services/github.service';
import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { UserDetails } from '../../shared/models/user-details';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {

  private githubService = inject(GithubService)

  @Input({ required: true }) userName: string = '';

  user?: UserDetails

  ngOnChanges(changes: SimpleChanges): void {
    if (this.userName) {
      this.githubService.getUserDetails(this.userName).subscribe((res) => {
        this.user = res
      })
    }
  }

}
