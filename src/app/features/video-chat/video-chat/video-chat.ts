import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-video-chat',
  imports: [ MatIconModule,CommonModule,MatButtonModule,MatDialogModule,MatCheckboxModule,RouterLink,
     MatCheckboxModule,MatTabsModule, MatAccordion, MatExpansionModule
  ],
  templateUrl: './video-chat.html',
  styleUrl: './video-chat.scss',
})
export class VideoChat {

}
