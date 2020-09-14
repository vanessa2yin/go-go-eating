import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RestaurantManipulationService } from '../../../service/restaurant_manipulation.service';

@Component({
    selector: 'app-login-dialog',
    templateUrl: './login_dialog.component.html',
    styleUrls: ['./login_dialog.component.css', '../../app.component.css']
})
export class LoginDialogComponent implements OnInit { 
    constructor(
        private restaurantManipulationService: RestaurantManipulationService,
        public dialogRef: MatDialogRef<LoginDialogComponent>) { }

    ngOnInit() { }

    isLoginPage: boolean = true;
}