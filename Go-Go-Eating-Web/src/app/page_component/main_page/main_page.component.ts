import { Component } from '@angular/core';

@Component({
    selector: 'app-main-page',
    templateUrl: './main_page.component.html',
    styleUrls: ['./main_page.component.css']
})
export class MainPageComponent {
    steps = [
        {
            title: 'Step1',
            content: 'Search eating buddies around your location'
        },
        {
            title: 'Step2',
            content: 'Join your preferred group!'
        },
        {
            title: 'Step3',
            content: 'Go Eating!'
        }
    ]

}