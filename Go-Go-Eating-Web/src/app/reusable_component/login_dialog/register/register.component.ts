import { Component } from '@angular/core';
import { UserService } from 'src/service/user.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'dialog-register',
    templateUrl: './register.component.html',
    styleUrls: ['../login/login.component.css']
})
export class RegisterComponent {
    constructor(private userService: UserService, private ref: MatDialogRef<RegisterComponent>) { }

    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;

    async register(): Promise<null> {
        if (this.firstName === undefined || 
            this.lastName === undefined || 
            this.username === undefined || 
            this.password === undefined || 
            this.email === undefined) {
            Swal.fire({
                title: 'Oops',
                text: 'Incomplete Information',
                type: 'error'
            });
            return;
        }
        try {
            const userId = await this.userService.register(this.email, this.username, `${this.firstName} ${this.lastName}`, this.password);
            localStorage.setItem('userId', userId);
            Swal.fire({
                title: 'Yay',
                text: 'Welcome to GoEating!',
                type: 'success'
            });
            this.ref.close();
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Oops',
                text: error,
                type: 'error'
            });
        }
        return;
    }
}