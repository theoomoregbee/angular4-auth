import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, RequestOptions, RequestMethod, RequestOptionsArgs, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { environment } from "environments/environment";

import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiHandler extends Http {
  private bearer: string = 'Bearer';

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

/**
 * 
 * @param service_url this is our api method url
 * @param method this can either be RequestMethod.POST, RequestMethod.GET etc...
 * @param params this is the data we are sending across to our api backend for processing
 * @param options incase we want to pass our custom options like headers and all
 */
  callService(service_url, method: RequestMethod, params: any = {}, options?: RequestOptionsArgs): Observable<any> {
    return super.request(this.getFullUrl(service_url), this.requestOptions(method, params, options))
      .catch(this.onCatch);
  }


  /**
   * Build API url.
   * and we remove any leading / from the service calls since 
   * we are not needing then in making request calls
   * e.g localhost:1337//base... to localhost:1337/base..
   * 
   * which our backend host is coming from the environment
   * 
   * @param url
   * @returns {string}
   */
  private getFullUrl(url: string): string {
    if (url.charAt(0) == "/") {
      url = url.substring(1);
    }
    return environment.endpoint + url;
  }


  /**
   * Request options is used to manipulate and handle needed information before
   * it is sent to server and it also adds our token authorization header if it is 
   * present in our storage
   * @param options
   * @returns {RequestOptionsArgs}
   */
  private requestOptions(method: RequestMethod, params: any, options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    options.method = method;

    if (options.method === RequestMethod.Post || options.method === RequestMethod.Put) {
      options.body = params;
    } else {
      options.params = params;
    }

    if (options.headers == null && localStorage.getItem('token') != null) {
      options.headers = new Headers({
        'Authorization': `${this.bearer} ${localStorage.getItem('token')}`
      });
    }
    return options;
  }


  /**
   * Error handler. 
   * do any middle ware checking before sending it to observable caller 
   * 
   * @param error
   * @param caught
   * @returns {ErrorObservable}
   */
  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    
    return Observable.throw(error);
  }

}
