import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MealRequestManipulationService } from '../../../service/meal_request_manipulation.service';
import { CommunicationService } from 'src/service/communication.service';
import { FilterDialogComponent } from '../../reusable_component/filter_dialog/filter_dialog.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-explore-page',
    templateUrl: './explore_page.component.html',
    styleUrls: ['./explore_page.component.css', '../../app.component.css'],
    host: {
        '(window:resize)': 'onResize($event)'
    }
})
export class ExplorePageComponent implements OnInit {
    zipcode: string = "61820";
    mealRequestIdList: string[] = [];
    currRequestIdList: string[] = [];
    pageNumber: number = 1;
    preference: string = undefined;
    resultListHeight: number;
    containerWidth: number;
    onlyShowSelf: boolean;

    constructor(private mealRequeststManipulationService: MealRequestManipulationService,
        private communicationService: CommunicationService,
        private dialog: MatDialog,
        private changeDetection: ChangeDetectorRef) {
            this.communicationService.getZipcode()
            .subscribe(
                (zipcode) => {
                    if (zipcode !== null && zipcode !== undefined) {
                        this.zipcode = zipcode;
                        this.initMealRequestIdList();
                    }
                }
            );

            this.communicationService.getPostFilterInfo()
            .subscribe(
                (info) => {
                    if (info === null) {
                        return;
                    }
                    this.zipcode = info['zipcode'];
                    this.preference = info['preference'];
                    this.onlyShowSelf = info['onlyShowMyRequest'];
                    this.initMealRequestIdList();
                }
            );
        }

    ngOnInit() {
        this.initMealRequestIdList();
        this.resultListHeight = this.getHeight();
        this.containerWidth = this.getWidth();
    }

    onResize() {
        this.resultListHeight = this.getHeight();
        this.containerWidth = this.getWidth();
    }


    getHeight(): number {
        return window.innerHeight > 640 ? window.innerHeight * 0.8 : 160;
    }

    getWidth(): number {
        return Math.min(Math.floor(window.innerWidth * 0.8 / 220) * 222, 888);
    }

    filter(): void {
        this.dialog.open(FilterDialogComponent, {
            panelClass: 'filter-class'
        });
    }
    
    async initMealRequestIdList() {
        try {
            this.mealRequestIdList = await this.mealRequeststManipulationService.searchMealRequest({
                zipcode: this.zipcode,
                preference: this.preference,
                organizer: this.onlyShowSelf ? parseInt(localStorage.getItem('userId')) : undefined
            });
            this.setCurrRequestIdList(this.pageNumber);
        } catch (error) {
            console.log(error);
        }
    }

    setCurrRequestIdList(pageNumber: number): void {
        this.pageNumber = pageNumber;
        this.currRequestIdList = [];
        this.currRequestIdList = this.mealRequestIdList.slice((this.pageNumber - 1) * 20, this.pageNumber * 20);
    }
}