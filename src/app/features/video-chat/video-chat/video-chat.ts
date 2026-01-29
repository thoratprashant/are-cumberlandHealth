import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-video-chat',
  imports: [CarouselModule,MatIconModule,CommonModule,MatButtonModule,MatDialogModule,MatCheckboxModule],
  templateUrl: './video-chat.html',
  styleUrl: './video-chat.scss',
})
export class VideoChat {

}
