import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-master-data',
  imports: [CommonModule, FormsModule],
  templateUrl: './master-data.html',
  styleUrl: './master-data.scss'
})
export class MasterData implements OnInit {

  // INITIAL values from API (static for now)
  originalData = {
    isMaintenance: false,
    telegramUrl: "https://t.me/YourTelegramGroup"
  };

  // BOUND VALUES (editable)
  formData = {
    isMaintenance: false,
    telegramUrl: ""
  };

  // Button disable logic
  isChanged = false;

  ngOnInit(): void {
    // Simulate API response
    this.formData.isMaintenance = this.originalData.isMaintenance;
    this.formData.telegramUrl = this.originalData.telegramUrl;

    this.checkIfChanged();
  }

  checkIfChanged() {
    this.isChanged =
      this.formData.isMaintenance !== this.originalData.isMaintenance ||
      this.formData.telegramUrl !== this.originalData.telegramUrl;
  }

  updateMasterData() {
    console.log("Updated Master Data:", this.formData);

    // After saving → treat new values as latest baseline
    this.originalData = { ...this.formData };
    this.isChanged = false;
  }
}
