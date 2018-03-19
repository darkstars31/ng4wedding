import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RsvpService {

   private url = location.href.includes('tonysanti.com') == true ? 'http://40.77.25.47:3031' : 'http://localhost:3031';
    
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
        let url = `${this.url}/health`;   
        return this.http.get(url).toPromise();              
    }

    public verifyRsvpCode(rsvpCode: string): Promise<string> {      
        let url = `${this.url}/rsvp/${rsvpCode}`;
        var accessToken = this.http.get<string>(url, { observe: 'body'}).toPromise().catch(this.handleError);      
        accessToken.then(response => localStorage.setItem('accessToken', response['accessToken']));
        return accessToken;
    }

    public updateRsvpData(rsvpCode: string, data: object): Promise<any> {       
        let url = `${this.url}/rsvp/${rsvpCode}`;
        return this.http.patch(url, data, { headers: this.createHeaders()})
        .toPromise().catch(this.handleError);     
    }
}