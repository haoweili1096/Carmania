import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { newsletterRoute } from './routes';
import { throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NewsletterService {
    constructor(
        private http: HttpClient
    ) {}

    subscribeUser(email: string) {
        return this.http.get<{email: string}[]>(`${newsletterRoute}?email=${email}`)
            .pipe(
                mergeMap(data => {
                    if(data.length > 0){
                        // if we get something
                        return throwError('Already on the database');
                    }
                    return this.http.post(`${newsletterRoute}`, {email});
                })
            )
    }
}