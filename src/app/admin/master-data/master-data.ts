import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-master-data',
  imports: [CommonModule, FormsModule],
  templateUrl: './master-data.html',
  styleUrl: './master-data.scss'
})
export class MasterData implements OnInit {

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  // INITIAL values from API (static for now)
  originalData: any = {}
  // BOUND VALUES (editable)
  formData = {
    isMaintenance: false,
    telegramUrl: "",
    telegramUrlOne: ""
  };

  // Button disable logic
  isChanged = false;

  ngOnInit(): void {
    // Simulate API response
    this.getData();
    this.checkIfChanged();
  }

  checkIfChanged() {
    this.isChanged =
      this.formData.isMaintenance !== this.originalData.isMaintenance ||
      this.formData.telegramUrl !== this.originalData.telegramUrl ||
      this.formData.telegramUrlOne !== this.originalData.telegramUrlOne;
  }

  updateMasterData() {
    console.log("Updated Master Data:", this.formData);

    // After saving → treat new values as latest baseline
    this.originalData = { ...this.formData };
    this.isChanged = false;

    let payload = {
      "updates": {
        "isUnderMaintainance": this.originalData.isMaintenance,
        "telegramLinkOne": this.originalData.telegramUrl,
        "telegramLinkTwo": this.originalData.telegramUrlOne
      }
    }

    console.log(payload)

    this.authService.updateMasterData(payload).subscribe({
      next: (res) => {
        if (res.statusCode === 200 && Array.isArray(res.data)) {
          this.snackBar.open('Data Updated Successfully!', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
        }
      },
      error: (err) => {
        console.error("❌ Users API Error:", err);
      }
    });
  }


  getData() {
    const payload = { screen: 'Users' };

    console.log("📌 Calling Admin Users API:", payload);

    this.authService.getMasterData().subscribe({
      next: (res) => {
        console.log("✅ Users API Response:", res);

        if (res.statusCode === 200 && Array.isArray(res.data)) {
          this.originalData = {
            isMaintenance: res.data[0].isUnderMaintainance,
            telegramUrl: res.data[0].telegramLinkOne,
            telegramUrlOne: res.data[0].telegramLinkTwo
          };
          this.formData.isMaintenance = this.originalData?.isMaintenance || false;
          this.formData.telegramUrl = this.originalData?.telegramUrl || '';
          this.formData.telegramUrlOne = this.originalData?.telegramUrlOne || '';
        }
      },
      error: (err) => {
        console.error("❌ Users API Error:", err);
      }
    });
  }


}
