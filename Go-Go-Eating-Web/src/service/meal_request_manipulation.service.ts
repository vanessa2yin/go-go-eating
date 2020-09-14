import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverAddress } from '../config/config';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable()
export class MealRequestManipulationService {
    // serverConfig: A class storing server information such as addres
    constructor(private http: HttpClient) {}

    // Post a meal request
    async createMealRequest(info: object): Promise<object> {
        // Set up request properties
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const options = {
            headers: headers
        };
        // Post request
        return new Promise<object>((resolve, reject) => {
            this.http.post(serverAddress + '/meal_request', info, options)
            .subscribe(
                (result: object) => {
                    resolve(result);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    // Search meal request by zipcode and preference
    async searchMealRequest(info: object): Promise<string[]> {
        // Set up request properties
        let params = new HttpParams().set('zipcode', info['zipcode']);
        if (info['preference'] !== undefined) {
            params = params.set('preference', info['preference']);
        }
        if (info['organizer'] !== undefined) {
            params = params.set('organizer', info['organizer']);
        }
        const options = {
            params: params
        };
        // GET request
        return new Promise<string[]>((resolve, reject) => {
            this.http.get(serverAddress + '/meal_request/search', options)
            .subscribe(
                (result: string[]) => {
                    resolve(result);
                },
                (error) => {
                    reject(error);
                }
            )
        });
    }

    // Get meal request by request id
    async getMealRequestById(id: string): Promise<object> {
        return new Promise<object>((resolve, reject) => {
            this.http.get(serverAddress + '/meal_request', { params: new HttpParams().set('requestId', id)})
            .subscribe(
                (result: object) => {
                    resolve(result);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    // Join meal request
    async joinMealRequest(mealRequestId: string, userId: number): Promise<object> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const body = {
            requestId: mealRequestId,
            participantId: userId
        };
        return new Promise<object>((resolve, reject) => {
            this.http.patch(serverAddress + '/meal_request/join', body, { headers: headers})
            .subscribe(
                (result: object) => {
                    resolve(result);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    // Quit meal request
    async quitMealRequest(mealRequestId: string, userId: number): Promise<object> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const body = {
            requestId: mealRequestId,
            participantId: userId
        };
        return new Promise<object>((resolve, reject) => {
            this.http.patch(serverAddress + '/meal_request/quit', body, { headers: headers})
            .subscribe(
                (result: object) => {
                    resolve(result);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    // Delete meal request
    async deleteMealRequest(mealRequestId: string): Promise<null> {
        const params = new HttpParams().set('requestId', mealRequestId);
        return new Promise<null>((resolve, reject) => {
            this.http.delete(serverAddress + '/meal_request', { params: params})
            .subscribe(
                () => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    // Get Invitation request received
    async getInvitationReceived(): Promise<object[]> {
        const params = new HttpParams().set('userId', localStorage.getItem('userId'));
        const options = { params: params };
        return new Promise<object[]>((resolve, reject) => {
            this.http.get(serverAddress + '/meal_request/invitationRequestReceived', options)
            .subscribe(
                (result: object[]) => {
                    resolve(result);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    // Get Merge request received
    async getMergeReceived(): Promise<object[]> {
        const params = new HttpParams().set('userId', localStorage.getItem('userId'));
        const options = { params: params };
        return new Promise<object[]>((resolve, reject) => {
            this.http.get(serverAddress + '/meal_request/mergeReceived', options)
            .subscribe(
                (result: object[]) => {
                    resolve(result);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    // Accept invitation
    async acceptInviteRequest(requestId: string): Promise<null> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const body = {
            requestId: requestId,
            userId: localStorage.getItem('userId')
        };
        return new Promise<null>((resolve, reject) => {
            this.http.patch(serverAddress + "/meal_request/acceptInviteRequest", body, { headers: headers })
            .subscribe(
                () => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    // Decline invitation
    async declineInviteRequest(requestId: string): Promise<null> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const body = {
            requestId: requestId,
            userId: localStorage.getItem('userId')
        };
        return new Promise<null>((resolve, reject) => {
            this.http.patch(serverAddress + "/meal_request/declineInviteRequest", body, { headers: headers })
            .subscribe(
                () => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }


    // Accept Merge Invitation
    async acceptMergeRequest(invitingRequestId: string, invitedRequestId: string, inviterId: string, inviteeId: string): Promise<null> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const body = {
            invitingRequestId: invitingRequestId,
            invitedRequestId: invitedRequestId,
            inviterId: inviterId,
            inviteeId
        };
        return new Promise<null>((resolve, reject) => {
            this.http.patch(serverAddress + '/meal_request/acceptMergeRequest', body, { headers: headers })
            .subscribe(
                () => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    // Decline Merge Invitation
    async declineMergeRequest(invitingRequestId: string, invitedRequestId: string): Promise<null> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const body = {
            invitingRequestId: invitingRequestId,
            invitedRequestId: invitedRequestId
        };
        return new Promise<null>((resolve, reject) => {
            this.http.patch(serverAddress + '/meal_request/declineMergeRequest', body, { headers: headers })
            .subscribe(
                () => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    // Send invitation by userId
    async sendInvitation(userId: string, requestId: string): Promise<null> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const body = {
            userId: userId,
            requestId: requestId
        };
        return new Promise<null>((resolve, reject) => {
            this.http.post(serverAddress + '/meal_request/sendInviteRequest', body, { headers: headers })
            .subscribe(
                () => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }
}