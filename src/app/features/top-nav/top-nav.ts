import { Component } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-top-nav',
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,MatSelectModule],
  templateUrl: './top-nav.html',
  styleUrl: './top-nav.scss'
})
export class TopNav {

}
