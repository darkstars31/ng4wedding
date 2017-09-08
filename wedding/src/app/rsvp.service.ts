import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class RsvpService {
    private url = 'api/anys';
    private headers = new Headers({'Content-Type': 'application/json'});
    
    constructor(private http: Http) {}

    private handleError(error: any): Promise<any> {  
        console.error('An Error occurred', error);
        return Promise.reject(error.message || error);   
    }

    public validateRsvpCode(rsvpCode: any): Promise<any>    {
        
        const url = `${this.url}/${rsvpCode}`;
        // return this.http.put(url, JSON.stringify(rsvpCode), {headers: this.headers})
        // .toPromise()
        // .then(response => response.json().data) 
        // .catch(this.handleError);
        return Promise.resolve("taco");
    }


}
