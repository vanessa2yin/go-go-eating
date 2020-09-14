import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-instruction',
    templateUrl: './instruction.component.html',
    styleUrls: ['./instruction.component.css', '../../app.component.css']
})
export class InstructionComponent {
    @Input() title: string;
    @Input() content: string;
}