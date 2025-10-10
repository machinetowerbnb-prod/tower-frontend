import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, MatButtonModule, MatIconModule, FlexLayoutModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {

}
