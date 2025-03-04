import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockStore: MockStore;

  const initialState = {
    users: {
      usersList: {
        items: [{ login: 'karim', html_url: 'https://github.com/karim', avatar_url: 'https://avatars.githubusercontent.com/u/1668?v=4' }],
        total_count: 1
      },
      loader: false
    }
  };

  const mockActivatedRoute = {
    queryParams: of({ query: 'testQuery' })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent, HttpClientTestingModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the loader when loader$ is true', () => {
    mockStore.setState({ users: { usersList: [], loader: true } });
    fixture.detectChanges();
    const loader = fixture.debugElement.query(By.css('.spinner'));
    expect(loader).toBeTruthy();
  });

  it('should display the table when users exist', () => {
    fixture.detectChanges();
    const table = fixture.debugElement.query(By.css('p-table'));
    expect(table).toBeTruthy();
  });

  it('should call openUserProfile() when clicking an avatar', () => {
    spyOn(component, 'openUserProfile');

    fixture.detectChanges();

    const avatar = fixture.debugElement.query(By.css('td img'));
    expect(avatar).toBeTruthy();
    avatar.nativeElement.click();

    fixture.detectChanges();
    expect(component.openUserProfile).toHaveBeenCalled();
  });
});
