import { Component, OnInit, Input } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { MealRequestManipulationService } from '../../../service/meal_request_manipulation.service';
import { CommunicationService } from '../../../service/communication.service';

@Component({
    selector: 'app-request-form',
    templateUrl: './request_form.component.html',
    styleUrls: ['./request_form.component.css', '../../app.component.css'],
    host: {
        '(window:resize)': 'onResize($event)'
    }
})
export class RequestFormComponent implements OnInit {
    model: NgbDateStruct;
    range: number[];
    capacity: number;
    zipcode: string;
    address: string;
    preference: string;
    height: number;
    time: string;
    @Input() info: object;

    constructor(private mealRequestService: MealRequestManipulationService, 
            private communicationService: CommunicationService) {
                communicationService.getPostRequestInfo()
                .subscribe((info) => {
                    if (info !== null) {
                        this.info = info;
                        this.address = this.info['address'];
                        this.zipcode = this.info['zip_code'];
                    }
                });
            }

    ngOnInit() {
        this.range = [];
        for (let i = 0; i < 25; i++) {
            this.range.push(i);
        }
    }

    onResize() {
        this.height = window.innerHeight < 480 ? window.innerHeight * 0.45 : window.innerHeight * 0.8;
    }

    setCapacity(input: number) {
        this.capacity = input;
    }

    async post(): Promise<null> {
        try {
            const time: Date = new Date(this.model.year, this.model.month - 1, this.model.day, parseInt(this.time.split(':')[0]), parseInt(this.time.split(':')[1]));
            this.mealRequestService.createMealRequest({
                organizer: parseInt(localStorage.getItem('userId')),
                zipcode: this.zipcode,
                time: time,
                preference: this.preference,
                capacity: this.capacity,
                address: this.address
            });
            this.communicationService.postStatus({
                title: 'Hoo-Ray',
                text: 'Request Posted',
                type: 'success'
            });
        } catch (error) {
            this.communicationService.postStatus({
                title: 'Oops...',
                text: 'Something went wrong!',
                type: 'error'
            });
            console.log(error);
        }
        return null;
    }
}