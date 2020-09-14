import { Component, OnInit } from '@angular/core';
import { isMainPage, isExplore, isRestaurants, isOrganize, isNotification } from './utils/determine_selected_page';
import { CommunicationService } from 'src/service/communication.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private communicationService: CommunicationService) {
        this.communicationService.getPostStatus()
        .subscribe((status) => {
            if (status !== null) {
                Swal.fire(status);
            }
        });
    }

    ngOnInit() {
        localStorage.setItem('selectedPage', 'GoEating');
    }

    isLoggedIn(): boolean {
        return localStorage.getItem('userId') !== null;
    }

    isMainPage = isMainPage;
    isExplore = isExplore;
    isRestaurants = isRestaurants;
    isOrganize = isOrganize;
    isNotification = isNotification;

    frontPagePath: string = '../assets/vegetable_and_spoon_meitu_1.jpg';
    otherPagePath: string = '../assets/vegetable_and_spoon.jpg';
}
