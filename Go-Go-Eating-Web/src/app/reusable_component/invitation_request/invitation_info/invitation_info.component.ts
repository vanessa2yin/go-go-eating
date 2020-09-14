import { Component, Input, OnInit } from "@angular/core";
import { MealRequestManipulationService } from 'src/service/meal_request_manipulation.service';
import { UserService } from 'src/service/user.service';
import { CommunicationService } from 'src/service/communication.service';

@Component({
    selector: 'app-invitation-info',
    templateUrl: './invitation_info.component.html',
    styleUrls: ['./invitation_info.component.css']
})
export class InvitationInfoComponent implements OnInit {
    constructor(private mealRequest: MealRequestManipulationService,
        private userService: UserService,
        private communicationService: CommunicationService) { }

    ngOnInit() {
        this.initInviteInfo();
    }

    @Input() requestId: string;
    info: object;
    hostInfo: object;
    date: string;
    time: string;

    async initInviteInfo(): Promise<null> {
        try {
            this.info = await this.mealRequest.getMealRequestById(this.requestId);
            this.hostInfo = await this.userService.getInfo(this.info['organizer']);
            this.initTime();
        } catch (error) {
            console.log(error);
        }
        return;
    }

    initTime(): void {
        const curr = new Date(this.info['time']);
        this.date = curr.getFullYear() + '/' + (curr.getMonth() + 1) + '/' + curr.getDay();
        this.time = this.getMinute(curr.getHours()) + ':' + this.getMinute(curr.getMinutes());
    }

    getMinute(value: number): string {
        if (value === 0) {
            return '00';
        }
        if (value < 10) {
            return '0' + value;
        }
        return value + '';
    }

    async accept(): Promise<null> {
        try {
            await this.mealRequest.acceptInviteRequest(this.requestId);
            this.communicationService.postUpdate('invitation');
        } catch (error) {
            console.log(error);
        }
        return;
    }

    async decline(): Promise<null> {
        try {
            await this.mealRequest.declineInviteRequest(this.requestId);
            this.communicationService.postUpdate('invitation');
        } catch (error) {
            console.log(error);
        }
        return;
    }
}