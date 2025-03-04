import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GithubService {

    constructor(private http: HttpClient) { }

    searchUsers(query: string = 'ahmed', page: number = 1, perPage: number = 10): Observable<any> {
        return this.http.get(`${environment.baseUrl}/search/users?q=${query}&page=${page}&per_page=${perPage}`);
    }

    getUserDetails(username: string): Observable<any> {
        return this.http.get(`${environment.baseUrl}/users/${username}`);
    }

    getUserRepositories(username: string, page: number = 1, perPage: number = 10, sort: string = 'created'): Observable<any> {
        return this.http.get(`${environment.baseUrl}/users/${username}/repos?sort=${sort}&page=${page}&per_page=${perPage}`);
    }
}
