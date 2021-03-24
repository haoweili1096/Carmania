import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

//cookie can not use array, can only use string

@Injectable({
    providedIn: 'root'
})
export class FavsService {
    constructor(
        private cookieService: CookieService
    ) {}

    checkFavStatus(postId: number) {
        if(this.checkFavExists(postId)){
            return false;
        }
        else{
            return true;
        }
    }

    onToggleFav(postId: number) {
        let state: boolean;
        const allCookies = JSON.parse(this.cookieService.get('favs'));
        if(!this.checkFavExists(postId)){
            // ADD TO FAVS
            allCookies.push(postId);
            state = false;
        }
        else{
            allCookies.splice(allCookies.indexOf(postId), 1);
            state = true;
        }
        this.cookieService.set('favs', JSON.stringify(allCookies));
        return state;
    }

    getAllCookies() {
        if(this.cookieService.check('favs')){
            // parse string
            return JSON.parse(this.cookieService.get('favs'));
        }
        else{
            // []
            this.cookieService.set('favs', '[]');
            return [];
        }
    }

    checkFavExists(postId: number) {
        const allCookies = this.getAllCookies();
        return allCookies.includes(postId);
    }
}