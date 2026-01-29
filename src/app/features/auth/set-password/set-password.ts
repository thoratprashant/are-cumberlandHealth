import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router'; 
import { CommonService } from '../../../core/helper/common.service';
 

@Component({
  selector: 'app-set-password',
  imports: [CommonModule,MatIconModule, MatButtonModule,RouterLink,MatButtonModule, MatIconModule],
  templateUrl: './set-password.html',
  styleUrl: './set-password.scss',
})
export class SetPassword {

  showNewPassword = false; 

  toggleNewPassword(): void {
    this.showNewPassword = !this.showNewPassword;
  } 

    constructor(
    private commonService: CommonService,
    private router: Router, 
  ) {
   
  }

  onSubmit(){
       this.commonService.showLoader();

    setTimeout(() => {
      this.commonService.hideLoader();
      this.router.navigate(['/admin/user-managment']);
    }, 5000);
  }

}
