import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommunicationService } from 'src/service/communication.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-filter-dialog',
    templateUrl: './filter_dialog.component.html',
    styleUrls: ['./filter_dialog.component.css']
})
export class FilterDialogComponent { 
    constructor(
        private communicationService: CommunicationService,
        public dialogRef: MatDialogRef<FilterDialogComponent>) { }

    onlyShowMyRequest: boolean = false;
    zipcode: string;
    preference: string;
    option: string;

    save() {
        if (this.zipcode === undefined) {
            Swal.fire({
                title: 'Oops',
                text: 'Missing Zipcode', 
                type: 'error'
            });
            return;
        }
        const info = {
            onlyShowMyRequest: this.option === 'Only me', 
            zipcode: this.zipcode,
            preference: this.preference
        };
        this.communicationService.postFilterInfo(info);
        this.dialogRef.close();
    }


}