import { Component, Input, OnInit } from "@angular/core";
import { MealRequestManipulationService } from 'src/service/meal_request_manipulation.service';
import { CommunicationService } from 'src/service/communication.service';
import { UserService } from 'src/service/user.service';

@Component({
    selector: 'app-merge-info',
    templateUrl: './merge_info.component.html',
    styleUrls: ['./merge_info.component.css']
})
export class MergeInfoComponent implements OnInit {
    constructor(private mealRequest: MealRequestManipulationService,
        private communicationService: CommunicationService,
        private userService: UserService) {}

    @Input() mergeInfo: object;
    invitingRequestInfo: object;
    invitedRequestInfo: object;
    inviterInfo: object;
    ngOnInit() {
        this.initInfo();
    }

    async initInfo(): Promise<null> {
        try {
            this.invitingRequestInfo = await this.mealRequest.getMealRequestById(this.mergeInfo['inviting_request_id']);
            this.invitedRequestInfo = await this.mealRequest.getMealRequestById(this.mergeInfo['invited_request_id']);
            this.inviterInfo = await this.userService.getInfo(this.mergeInfo['inviter_id']);
            console.log(this.mergeInfo);
        } catch (error) {
            console.log(error);
        }
        return;
    }

    async accept(): Promise<null> {
        try {
            await this.mealRequest.acceptMergeRequest(this.mergeInfo['inviting_request_id'], this.mergeInfo['invited_request_id'], this.mergeInfo['inviter_id'], this.mergeInfo['invitee_id']);
            this.communicationService.postUpdate('merge');
        } catch (error) {
            console.log(error);
        }
        return;
    }

    async decline(): Promise<null> {
        try {
            await this.mealRequest.declineMergeRequest(this.mergeInfo['inviting_request_id'], this.mergeInfo['invited_request_id']);
            this.communicationService.postUpdate('merge');
        } catch (error) {
            console.log(error);
        }
        return;
    }
}