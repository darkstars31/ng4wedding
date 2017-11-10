import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class RsvpService {

   private url = location.href.includes('tonysanti.com') || true ? 'http://40.77.25.47:3031/rsvp' : 'http://localhost:3031/rsvp';
  
    constructor(private http: HttpClient) {}

    private handleError(error: any): Promise<any> {  
        console.error('An Error occurred', error);
        return Promise.reject(error.message || error);   
    }
   
    public verifyApiStatus(): void {
        const url = `${this.url}/health`;      
        this.http.get(url, { observe: 'response'}).toPromise().then(res => console.log(res));              
    }

    public verifyRsvpCode(rsvpCode: string): Promise<string> {      
        const url = `${this.url}/${rsvpCode}`;
        return this.http.get(url)
        .toPromise()
        .then(res => res['accessToken']) 
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
