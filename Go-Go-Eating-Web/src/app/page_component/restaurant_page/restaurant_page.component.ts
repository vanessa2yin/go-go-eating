import { Component, OnInit } from '@angular/core';
import { RestaurantManipulationService } from '../../../service/restaurant_manipulation.service';

@Component({
    selector: 'app-restaurant-page',
    templateUrl: './restaurant_page.component.html',
    styleUrls: ['./restaurant_page.component.css', '../../app.component.css'],
    host: {
        '(window:resize)': 'onResize($event)'
    }
})
export class RestaurantPageComponent implements OnInit {
    restaurantIdList: number[] = [];
    currentRestaurantIdList: number[];
    pageNumber: number = 1;
    resultListHeight: number;

    constructor(private restaurantManipulation: RestaurantManipulationService) { }

    ngOnInit() {
        this.resultListHeight = this.getHeight();
        this.initRestaurantList();
    }

    onResize() {
        this.resultListHeight = this.getHeight();
    }

    async initRestaurantList(): Promise<null> {
        this.restaurantIdList = await this.restaurantManipulation.searchRestaurant({
            zipcode: 61820
        });
        this.setCurrentRestaurantIdList(1);
        return;
    }

    getHeight(): number {
        return window.innerHeight > 640 ? window.innerHeight * 0.8 : 160;
    }

    setCurrentRestaurantIdList(pageNumber: number): void {
        this.pageNumber = pageNumber;
        this.currentRestaurantIdList = [];
        const start = (this.pageNumber - 1) * 15;
        const end = this.pageNumber * 15;
        this.currentRestaurantIdList = this.restaurantIdList.slice(start, end);
    }
}