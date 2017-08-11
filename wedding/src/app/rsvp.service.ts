import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class RsvpService {
    private url = 'api/anys';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getanys(): Promise<any> {
        //return new Promise(resolve => setTimeout(() => resolve(this.anyList),30));
        return this.http.get(this.url).toPromise()
        .then(response => response.json().data as any)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {  
        console.error('An Error occurred', error);
        return Promise.reject(error.message || error);   
    }

    public update(any: any): Promise<any>    {
        const url = `${this.url}/${any.id}`;
        return this.http.put(url, JSON.stringify(any), {headers: this.headers})
        .toPromise()
        .then(() => any)
        .catch(this.handleError);
    }

    getanyById(id: number): Promise<any> {
        const url = `${this.url}/${id}`;
         return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as any)
            .catch(this.handleError);
    }
}