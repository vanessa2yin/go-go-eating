import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverAddress } from '../config/config';

@Injectable()
export class RestaurantManipulationService {
    // serverConfig: A class storing server information such as addres
    constructor(private http: HttpClient) {}

    // Search restaurant by query
    async searchRestaurant(query: object): Promise<number[]> {
        // Set up request properties
        let params = new HttpParams();
        for (let key of Object.keys(query)) {
            params = params.set(key, query[key]);
        }
        let headers = new HttpHeaders().set('userid', localStorage.getItem('userId'));
        const options = {
            params: params,
            headers: headers
        };
        // Get request
        return new Promise<number[]>((resolve, reject) => {
            this.http.get(serverAddress + '/restaurant/search', options)
            .subscribe(
                (result: object[]) => {
                    result.sort((one: object, two: object): number => {
                        return two['score'] - one['score'];
                    });
                    console.log(result);
                    const list: number[] = result.map((item) => { return item['restaurant_id'] });
                    resolve(list);
                },
                (error) => {
                    reject(error);
                }
            );
        });

    }

    // Get restaurant by id
    async getRestaurantById(restaurantId: number): Promise<object> {
        const params = new HttpParams().set('restaurant_id', restaurantId.toString());
        const options = {
            params: params
        }
        // Get request
        return new Promise<object>((resolve, reject) => {
            this.http.get(serverAddress + '/restaurant', options)
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

    // Get restaurant review by restuarantId and userId
    async getReviewRating(restuarantId: number, userId: number): Promise<object> {
        const params = new HttpParams().set('restaurant_id', restuarantId.toString()).set('user_id', userId.toString());
        const options = {
            params: params
        };
        // Get Request
        return new Promise<object>((resolve, reject) => {
            this.http.get(serverAddress + '/restaurant/review', options)
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

    // Post restaurant review
    async postReviewRating(restaurantId: number, userId: number, rating: number): Promise<object> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const body = {
            restaurant_id: restaurantId,
            user_id: userId,
            rating: rating
        };
        // Post request
        return new Promise<object>((resolve, reject) => {
            this.http.post(serverAddress + '/restaurant/review', body, { headers: headers })
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

    // Put restaurant review
    async putReviewRating(reviewId: number, rating: number): Promise<object> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = new HttpParams().set('review_id', reviewId.toString());
        const body = {
            rating: rating
        };
        // Put request
        return new Promise<object>((resolve, reject) => {
            this.http.put(serverAddress + '/restaurant/review', body, { headers: headers, params: params })
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