import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class RsvpService {
    private url = location.href.includes('tonysanti.com') || true ? 'http://40.77.25.47:3031/rsvp' : 'http://localhost:3031/rsvp';
  
    constructor(private http: HttpClient) {}

    private handleError(error: any): Promise<any> {  
        console.error('An Error occurred', error);
        return Promise.reject(error.message || error);   
    }

    public verifyRsvpCode(rsvpCode: string): Promise<string> {      
        const url = `${this.url}/${rsvpCode}`;
        return this.http.get(url, { responseType: 'text'})
        .toPromise()
        .then(res => res['accessToken']) 
        .catch(this.handleError);      
    }

    public verifyApiStatus(): Promise<string> {
        const url = `${this.url}/health`;
        return this.http.get(url,)
        .toPromise()
        .then(res => res) 
        .catch(this.handleError);
    }

    public updateRsvpData(rsvpCode: string, data: object): Promise<any> {
        
        const url = `${this.url}/${rsvpCode}`;
        return this.http.patch(url, JSON.stringify(data))
        .toPromise()
        .then(response => response) 
        .catch(this.handleError);     
    }
}
