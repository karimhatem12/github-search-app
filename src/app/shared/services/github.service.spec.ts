import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';

describe('GithubService', () => {
    let service: GithubService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GithubService]
        });
        service = TestBed.inject(GithubService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should fetch users from API', () => {
        const dummyUsers = { items: [{ login: 'octocat' }] };

        service.searchUsers('octocat').subscribe(users => {
            expect(users.items.length).toBe(1);
            expect(users.items[0].login).toBe('octocat');
        });

        const req = httpMock.expectOne('https://api.github.com/search/users?q=octocat&page=1&per_page=10');
        expect(req.request.method).toBe('GET');
        req.flush(dummyUsers);
    });

    afterEach(() => {
        httpMock.verify();
    });
});
