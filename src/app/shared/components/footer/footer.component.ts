import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-footer',
    imports: [CommonModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {

    @Input({ required: true }) footerInput!: {
        totalPages: number,
        pageNumber: number,
        pageSize: number,
        totalItems: number
    }

    @Output() footerOutput = new EventEmitter<{ pageNumber: number, pageSize: number }>();

    constructor() { }

    ngOnInit(): void {
        if (this.footerInput && this.footerInput.totalPages < this.footerInput.pageNumber) {
            if (this.footerInput.totalPages == 0)
                this.footerInput.pageNumber = 0
            else
                this.footerInput.pageNumber = 1
        }
    }

    onSizaPageChange(event: Event): void {
        const selectElement = event.target as HTMLSelectElement;
        const selectedValue = Number(selectElement.value);

        this.footerOutput.emit({ pageNumber: 1, pageSize: selectedValue })
    }

    onPageChange(pageNumber: number, pageSize: number): void {
        if (pageNumber <= this.footerInput.totalPages && pageNumber > 0)
            this.footerOutput.emit({ pageNumber, pageSize })
    }
}

