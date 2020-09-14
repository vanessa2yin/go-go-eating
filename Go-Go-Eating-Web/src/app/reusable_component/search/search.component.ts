import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommunicationService } from 'src/service/communication.service';
import { LoginDialogComponent } from '../login_dialog/login_dialog.component';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css', '../../app.component.css']
})
export class SearchComponent {
    zipcode: string;

    constructor(private communicationService: CommunicationService,
        public dialog: MatDialog) { }

    searchMealRequest(): void {
        if (localStorage.getItem('userId') === null) {
            this.login();
        }
        else {
            localStorage.setItem('selectedPage', 'Explore');
            this.communicationService.postZipcode(this.zipcode);
        }
    }

    login(): void {
        this.dialog.open(LoginDialogComponent, {
            panelClass: 'log-class'
        });
    }
}