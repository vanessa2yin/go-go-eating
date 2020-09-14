import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MealRequestManipulationService } from '../../../service/meal_request_manipulation.service';
import { MatDialog } from '@angular/material';
import { InviteDialogComponent } from './invite_dialog/invite_dialog.component';

@Component({
    selector: 'app-request-info-card',
    templateUrl: './request_info_card.component.html',
    styleUrls: ['./request_info_card.component.css', '../../app.component.css']
})
export class RequestInfoCardComponent implements OnInit, OnChanges {
    @Input() mealRequestId;

    info: object;
    date: string;
    hour: string;
    minute: string;
    time: string;
    userIsOrganizer: boolean;
    userIsParticipant: boolean;
    dismissed: boolean = false;

    constructor(private mealRequestManipulationService: MealRequestManipulationService,
        private dialog: MatDialog) { }

    ngOnInit() {
        this.initInfo();
    }

    ngOnChanges() {
        this.initInfo();
    }

    async initInfo() {
        try {
            this.info = await this.mealRequestManipulationService.getMealRequestById(this.mealRequestId);
            const date: Date = new Date(this.info['time']);
            this.date = date.toLocaleDateString();
            this.hour = this.getDisplayString(date.getHours());
            this.minute = this.getDisplayString(date.getMinutes());
            this.time = this.hour + ': ' + this.minute;
            this.userIsOrganizer = parseInt(localStorage.getItem('userId')) === this.info['organizer'];
            this.userIsParticipant = this.info['participants'].includes(parseInt(localStorage.getItem('userId')));
        } catch (error) {
            console.log(error);
        }
    }

    getDisplayString(value: number): string {
        if (value === 0) {
            return "00";
        }
        if (value <  10) {
            return "0" + value; 
        }
        return value + "";
    }

    async joinRequest() {
        try {
            this.info = await this.mealRequestManipulationService.joinMealRequest(this.info['_id'], parseInt(localStorage.getItem('userId')));
            this.userIsParticipant = this.info['participants'].includes(parseInt(localStorage.getItem('userId')));
        } catch (error) {
            console.log(error);
        }
    }

    async quitRequest() {
        try {
            this.info = await this.mealRequestManipulationService.quitMealRequest(this.info['_id'], parseInt(localStorage.getItem('userId')));
            this.userIsParticipant = this.info['participants'].includes(parseInt(localStorage.getItem('userId')));
        } catch (error) {
            console.log(error);
        }
    }

    async dismiss() {
        try {
            await this.mealRequestManipulationService.deleteMealRequest(this.info['_id']);
            this.dismissed = true;
        } catch (error) {
            console.log(error);
        }
    }

    invite() {
        localStorage.setItem('currRequestId', this.mealRequestId);
        this.dialog.open(InviteDialogComponent, {
            panelClass: 'filter-class'
        });
    }
}