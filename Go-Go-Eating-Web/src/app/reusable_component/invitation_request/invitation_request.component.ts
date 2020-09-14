import { Component, OnInit } from "@angular/core";
import { MealRequestManipulationService } from 'src/service/meal_request_manipulation.service';
import { CommunicationService } from 'src/service/communication.service';

@Component({
    selector: 'app-invitation-page',
    templateUrl: './invitation_request.component.html',
    styleUrls: ['./invitation_request.component.css']
})
export class InvitationPageComponent implements OnInit {
    constructor(private mealService: MealRequestManipulationService,
        private communicationService: CommunicationService) {
            this.communicationService.getUpdate()
            .subscribe(
                (message: string) => {
                    if (message === 'invitation') {
                        this.initInvitationInfoList();
                    }
                }
            );
        }

    invitationInfoList: object[];

    ngOnInit() {
        this.initInvitationInfoList();
    }

    async initInvitationInfoList(): Promise<null> {
        try {
            this.invitationInfoList = await this.mealService.getInvitationReceived();
        } catch (error) {
            console.log(error);
        }
        return;
    }
}