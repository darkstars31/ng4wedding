import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class RsvpService {
    private url = location.href.includes('tonysanti.com') || true ? 'http://40.77.25.47:3031/rsvp' : 'http://localhost:3031/rsvp';
    private headers = new Headers(
        {'Content-Type': 'application/json'}      
    );
  
    constructor(private http: Http) {
        var jwt = localStorage.getItem('accessToken');
        if(jwt != null){
            this.headers.append('Authorization', jwt);
        }
    }

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

    public verifyApiStatus(): Promise<string> {
        const url = `${this.url}/health`;
        return this.http.get(url, {headers: this.headers})
        .toPromise()
        .then(res => res.json()) 
        .catch(this.handleError);
    }

    public updateRsvpData(rsvpCode: string, data: object): Promise<any> {
        
        const url = `${this.url}/${rsvpCode}`;
        return this.http.patch(url, JSON.stringify(data), {headers: this.headers})
        .toPromise()
        .then(response => response.json().data) 
        .catch(this.handleError);     
    }
}
