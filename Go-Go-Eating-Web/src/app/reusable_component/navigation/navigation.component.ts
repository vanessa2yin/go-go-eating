import { Component } from '@angular/core';
import { isMainPage, isExplore, isRestaurants, isOrganize, isNotification } from '../../utils/determine_selected_page';

@Component({
    selector: 'Navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css', '../../app.component.css']
})
export class NavigationComponent {
    isMainPage = isMainPage;
    isExplore = isExplore;
    isRestaurants = isRestaurants;
    isOrganize = isOrganize;
    isNotification = isNotification;

    changeSelectedPage(input: string) : void {
        localStorage.setItem('selectedPage', input);
    }
}