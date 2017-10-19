import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class RsvpService {
    private url = 'http://localhost:3031/rsvp';
    private headers = new Headers(
        {'Content-Type': 'application/json'}
    );
    
    constructor(private http: Http) {}

    private handleError(error: any): Promise<any> {  
        console.error('An Error occurred', error);
        return Promise.reject(error.message || error);   
    }

    public verifyRsvpCode(rsvpCode: string): Promise<string> {
        
        const url = `${this.url}/${rsvpCode}`;
        return this.http.get(url, {headers: this.headers})
        .toPromise()
        .then(res => res.json()) 
        .catch(this.handleError);
        
    }

    public updateRsvpData(rsvpCode: string, data: string): Promise<any> {
        
        const url = `${this.url}/${rsvpCode}`;
        return this.http.patch(url, JSON.stringify(data), {headers: this.headers})
        .toPromise()
        .then(response => response.json().data) 
        .catch(this.handleError);
        
    }


}
