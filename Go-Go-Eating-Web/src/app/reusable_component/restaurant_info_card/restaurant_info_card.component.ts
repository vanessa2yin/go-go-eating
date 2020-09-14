import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { RestaurantManipulationService } from '../../../service/restaurant_manipulation.service';
import { ReviewDialogComponent } from '../../reusable_component/review_dialog/review_dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommunicationService } from '../../../service/communication.service';

@Component({
    selector: 'app-restaurant-info-card',
    templateUrl: './restaurant_info_card.component.html',
    styleUrls: ['./restaurant_info_card.component.css', '../../app.component.css']
})
export class RestaurantInfoCardComponent implements OnInit, OnChanges {
    @Input() restaurantId: number;
    info: object = null;

    constructor(private restaurantManipulation: RestaurantManipulationService,
        public dialog: MatDialog,
        private communicationService: CommunicationService) { }

    ngOnInit() {
        this.initInfo();
    }

    ngOnChanges() {
        this.initInfo();
    }

    organize(): void {
        localStorage.setItem('selectedPage', 'Organize');
        this.communicationService.postRequestInfo(this.info);
    }
 
    async rate(): Promise<null> {
        const userId: number = parseInt(localStorage.getItem('userId'));
        try {
            const ratingInfo = await this.restaurantManipulation.getReviewRating(this.restaurantId, userId);
            this.dialog.open(ReviewDialogComponent, {
                width: '500px',
                data: {
                    rating: ratingInfo['rating'],
                    reviewId: ratingInfo['review_id'],
                    userId: userId,
                    restaurantId: this.info['restaurant_id']
                }
            });
        } catch (error) {
            console.log(error);
        }

        return;
    }

    async initInfo() {
        try {
            const result = await this.restaurantManipulation.getRestaurantById(this.restaurantId);
            this.info = result['length'] === undefined ? result : result[0];
        } catch (error) {
            console.log(error);
        }
    }

}