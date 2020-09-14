import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { RestaurantManipulationService } from '../../../service/restaurant_manipulation.service';

@Component({
    selector: 'app-review-dialog',
    templateUrl: './review_dialog.component.html',
    styleUrls: ['./review_dialog.component.css', '../../app.component.css']
})
export class ReviewDialogComponent implements OnInit { 
    constructor(
        private restaurantManipulationService: RestaurantManipulationService,
        public dialogRef: MatDialogRef<ReviewDialogComponent>, 
        @Inject(MAT_DIALOG_DATA) 
        public data: any) { }

    ngOnInit() {
        this.rating = this.data.rating;
    }

    async rate() {
        console.log(this.data);
        try {
            if (this.data.reviewId === undefined) {
                await this.restaurantManipulationService.postReviewRating(this.data.restaurantId, this.data.userId, this.rating);
            }
            else {
                await this.restaurantManipulationService.putReviewRating(this.data.reviewId, this.rating);
            }

            this.dialogRef.close();
            Swal.fire({
                title: 'Hoo-Ray',
                text: 'Review Submitted',
                type: 'success'
            });
        } catch (error) {
            this.dialogRef.close();
            Swal.fire({
                title: 'Oops...',
                text: 'Something went wrong!',
                type: 'error'
            });
            console.log(error);
        }
    }

    rating = 0;

}