import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-update-amount',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-amount.html',
  styleUrl: './update-amount.scss'
})
export class UpdateAmount {
  @Input() show = false;
  @Input() actionType: string = '';
  @Input() rowData: any;

  @Output() close = new EventEmitter<void>();
  @Output() submitData = new EventEmitter<any>();

  formData = {
    action: '',
    amount: '',
    description: ''
  };

  ngOnChanges() {
    if (this.actionType) {
      this.formData.action = this.actionType; // Auto-fill
    }
  }

  closeModal() {
    this.show = false;
    this.close.emit();
  }

  submitForm() {
    console.log('Form submitted:', this.formData, 'Row data:', this.rowData);
    this.submitData.emit({ ...this.formData, row: this.rowData });
    this.closeModal();
  }
}