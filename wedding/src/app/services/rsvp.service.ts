import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RsvpService {

   private url =  location.href.includes('tonysanti.com') || true ? 'http://40.77.25.47:3031/rsvp' : 'http://localhost:3031/rsvp';
    
    constructor(private http: HttpClient) {}

    private handleError(error: any): Promise<any> {  
        console.error('An Error occurred', error);
        return Promise.reject(error.message || error);   
    }

    private createHeaders(): HttpHeaders {
        return new HttpHeaders().set('Authorization', localStorage.getItem('accessToken'))
                .set('Content-Type', 'Application/Json');
    }
   
    public verifyApiStatus(): Promise<any> {
        const url = `${this.url}/health`;      
        return this.http.get(url, { observe: 'body'}).toPromise().catch(this.handleError);              
    }

    public verifyRsvpCode(rsvpCode: string): Promise<string> {      
        const url = `${this.url}/${rsvpCode}`;
        var accessToken = this.http.get<string>(url, { observe: 'body'}).toPromise().catch(this.handleError);      
        accessToken.then(response => localStorage.setItem('accessToken', response['accessToken']));
        return accessToken;
    }

    public updateRsvpData(rsvpCode: string, data: object): Promise<any> {       
        const url = `${this.url}/${rsvpCode}`;
        return this.http.patch(url, data, { headers: this.createHeaders()})
        .toPromise().catch(this.handleError);     
    }
}