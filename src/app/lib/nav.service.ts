import { Injectable } from '@angular/core';

export interface Nav {
    path: string;
    name: string;
    exact: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class NavService {
    routes: Nav[] = [
        { path: '', name: 'Home', exact: true },
        { path: 'articles', name: 'Articles', exact: false },
        { path: 'contact', name: 'Contact', exact: false }
    ]
}