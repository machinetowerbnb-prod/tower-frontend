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
  @Input() prefilledWallet: any = '';   // ⭐ NEW — wallet passed from UserDetail

  @Output() close = new EventEmitter<void>();
  @Output() submitData = new EventEmitter<any>();

  formData = {
    screen: '',
    wallet: '',
    amount: '',
    description: '',
    action: ""
  };

  ngOnChanges() {
    if (this.actionType && this.rowData) {

      this.formData.screen = this.actionType;
      this.formData.action = this.actionType;

      // ✔ Wallet pre-fill from UserDetail OR Users table
      if (this.prefilledWallet !== '') {
        this.formData.wallet = this.prefilledWallet;
      } else {
        this.formData.wallet =
          this.actionType === 'Deposit'
            ? this.rowData.wallet
            : this.rowData.earnings;
      }
    }
  }

  closeModal() {
    this.close.emit();
  }

  submitForm() {
    this.submitData.emit({ ...this.formData, row: this.rowData });
    this.closeModal();
  }
}