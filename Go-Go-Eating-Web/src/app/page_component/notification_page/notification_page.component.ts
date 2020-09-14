import { Component } from "@angular/core";

@Component({
    selector: 'app-notification-page',
    templateUrl: './notification_page.component.html',
    styleUrls: ['./notification_page.component.css']
})
export class NotificationPageComponent {
    selectedPage: string = 'invitation';

    setPage(page) {
        this.selectedPage = page;
    }

}