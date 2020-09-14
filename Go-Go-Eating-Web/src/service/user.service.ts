import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { serverAddress } from '../config/config';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    // Register
    async register(email: string, username: string, fullname: string, password: string): Promise<string> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const body = {
            email: email,
            username: username,
            fullname: fullname,
            password: password
        };
        const options = {
            headers: headers
        };
        return new Promise<string>((resolve, reject) => {
            this.http.post(serverAddress + '/user/register', body, options)
            .subscribe(
                (result) => {
                    resolve(result['insertId']);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    // Login
    async login(email: string, password: string): Promise<object> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const body = {
            email: email,
            password: password
        };
        const options = {
            headers: headers
        };
        return new Promise<object>((resolve, reject) => {
            this.http.post(serverAddress + '/user/login', body, options)
            .subscribe(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    // getInfo
    async getInfo(userId: string): Promise<object> {
        const params = new HttpParams().set('userId', userId);
        return new Promise<object>((resolve, reject) => {
            this.http.get(serverAddress + '/user', { params: params })
            .subscribe(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    // search
    async search(username: string): Promise<object> {
        const params = new HttpParams().set('username', username);
        return new Promise<object>((resolve, reject) => {
            this.http.get(serverAddress + '/user/findByUsername', { params: params })
            .subscribe(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }
}