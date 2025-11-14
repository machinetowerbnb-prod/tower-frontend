import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-update-amount',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-amount.html',
  styleUrl: './update-amount.scss'
})
export class UpdateAmount implements OnChanges {
  @Input() show = false;
  @Input() actionType: string = '';
  @Input() rowData: any;

  @Output() close = new EventEmitter<void>();
  @Output() submitData = new EventEmitter<any>();

  formData = {
    screen: '',
    wallet: '',
    amount: '',
    description: '',
    action:""
  };

  ngOnChanges() {
    // When action type or rowData changes
    if (this.actionType) {
      console.log('Action Type:', this.actionType);
      this.formData.screen = this.actionType;
      if (this.actionType === 'Deposit') {
      console.log('Row Data Wallet:', this.rowData.wallet);
      this.formData.wallet = this.rowData.wallet;
    }else{
      this.formData.wallet = this.rowData.earnings;
    }
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
