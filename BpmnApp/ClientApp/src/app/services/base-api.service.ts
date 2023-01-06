import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ObservableInput, of, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';

export abstract class BaseApiService {
    readonly noCacheHeader: HttpHeaders;
    
    constructor(protected http: HttpClient) {
        this.noCacheHeader = new HttpHeaders({
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        });
     }

    navigateToAuthorize() {
        window.location.href = "/";
    }

    navigateTo(url: string) {
        window.location.href = url;
    }

    protected showError<T, R>(text: string, result: ObservableInput<R>): OperatorFunction<T, T | R> {
        return catchError(err => {
            if (err.error && err.error.errorCode) {
                return of(err.error);
            }
            else {
                console.error(err);
            }
            
            return result;
        });
    }
}
