import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-view-user',
  imports: [CommonModule,RouterLink ,MatButtonModule, MatDialogModule,MatIconModule,MatFormFieldModule, MatInputModule],
  templateUrl: './create-view-user.html',
  styleUrl: './create-view-user.scss',
})
export class CreateViewUser {

}
