import { Component } from '@angular/core';
import { UserService } from 'src/service/user.service';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
    selector: 'dialog-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css', '../login_dialog.component.css']
})
export class LoginComponent { 
    constructor(private userService: UserService, private ref: MatDialogRef<LoginComponent>) { }

    email: string = null; 
    password: string = null;

    async login(): Promise<null> {
        if (this.email === null || this.password === null) {
            Swal.fire({
                title: 'Oops',
                text: 'Incomplete Information',
                type: 'error'
            });
            return;
        }
        try {
            const userInfo = await this.userService.login(this.email, this.password);
            localStorage.setItem('userId', userInfo['user_id']);
            this.ref.close();
        } catch (error) {
            console.log(error);
        }
    }
}