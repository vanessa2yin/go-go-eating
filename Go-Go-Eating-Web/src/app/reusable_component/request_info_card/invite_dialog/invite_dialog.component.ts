import { Component } from "@angular/core";
import { MatDialogRef } from '@angular/material';
import { UserService } from 'src/service/user.service';
import Swal from 'sweetalert2';
import { MealRequestManipulationService } from 'src/service/meal_request_manipulation.service';

@Component({
    selector: 'app-invite-dialog',
    templateUrl: './invite_dialog.component.html',
    styleUrls: ['./invite_dialog.component.css']
})
export class InviteDialogComponent {
    constructor(private ref: MatDialogRef<InviteDialogComponent>,
        private userService: UserService,
        private mealService: MealRequestManipulationService) { }


    username: string;
    result: object;

    async search(): Promise<null> {
        if (this.username === undefined) {
            Swal.fire({
                title: 'Oops',
                text: 'Missing username',
                type: 'error'
            });
            return;
        }
        try {
            this.result = await this.userService.search(this.username);
        } catch (error) {
            console.log(error);
        }
    }

    async invite(): Promise<null> {
        try {
            await this.mealService.sendInvitation(this.result['user_id'], localStorage.getItem('currRequestId'));
            this.ref.close();
        } catch (error) {
            console.log(error);
        }
        return;
    }
}