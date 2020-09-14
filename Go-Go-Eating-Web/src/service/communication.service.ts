import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CommunicationService {
    postStatusSubject = new BehaviorSubject<object>(null);
    postRequestInfoSubject = new BehaviorSubject<object>(null);
    postZipcodeSubject = new BehaviorSubject<string>(null);
    filterSubject = new BehaviorSubject<object>(null);
    updateSubject = new BehaviorSubject<string>(null);

    postUpdate(message: string) {
        this.updateSubject.next(message);
    }

    getUpdate(): Observable<string> {
        return this.updateSubject.asObservable();
    }

    postFilterInfo(info: object): void {
        this.filterSubject.next(info);
    }

    getPostFilterInfo(): Observable<object> {
        return this.filterSubject.asObservable();
    }

    postRequestInfo(info: object): void {
        this.postRequestInfoSubject.next(info);
    }

    getPostRequestInfo(): Observable<object> {
        return this.postRequestInfoSubject.asObservable();
    }

    postStatus(alert: object): void {
        this.postStatusSubject.next(alert);
    }

    getPostStatus(): Observable<object> {
        return this.postStatusSubject.asObservable();
    }

    postZipcode(zipcode: string) {
        this.postZipcodeSubject.next(zipcode);
    }

    getZipcode(): Observable<string> {
        return this.postZipcodeSubject.asObservable();
    }

}