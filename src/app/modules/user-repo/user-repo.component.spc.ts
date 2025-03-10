import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRepoComponent } from './user-repo.component';

describe('UserRepoComponent', () => {
  let component: UserRepoComponent;
  let fixture: ComponentFixture<UserRepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRepoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
