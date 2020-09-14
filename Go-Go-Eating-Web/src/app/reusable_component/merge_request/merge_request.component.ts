import { Component, OnInit } from "@angular/core";
import { MealRequestManipulationService } from 'src/service/meal_request_manipulation.service';
import { CommunicationService } from 'src/service/communication.service';

@Component({
    selector: 'app-merge-page',
    templateUrl: './merge_request.component.html',
    styleUrls: ['./merge_request.component.css']
})
export class MergePageComponent implements OnInit {
    constructor(private mealRequest: MealRequestManipulationService,
        private communicationService: CommunicationService) {
            this.communicationService.getUpdate()
            .subscribe(
                (message: string) => {
                    if (message === 'merge') {
                        this.initMergeInfoList();
                    }
                }
            );
        }
    
    ngOnInit() {
        this.initMergeInfoList();
    }

    mergeInfoList: object[];

    async initMergeInfoList() {
        try {
            this.mergeInfoList = await this.mealRequest.getMergeReceived();
            console.log(this.mergeInfoList);
        } catch (error) {
            console.log(error);
        }
    }
    
}