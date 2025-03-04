import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockStore: MockStore;
  let mockRouter: Router;

  const initialState = { usersList: [], loader: false };

  const mockActivatedRoute = {
    queryParams: of({ query: 'testQuery' }),
    snapshot: { queryParamMap: { get: () => 'testQuery' } }
  };

  const mockRouterInstance = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, FormsModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouterInstance }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    mockRouter = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch search action when search() is called', () => {
    spyOn(mockStore, 'dispatch');
    component.query = 'angular';
    component.search();
    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it('should update queryParams on search', () => {
    component.query = 'angular';
    component.search();
    expect(mockRouter.navigate).toHaveBeenCalledWith([], {
      queryParams: { query: 'angular' },
      queryParamsHandling: 'merge'
    });
  });
});
