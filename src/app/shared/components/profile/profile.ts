import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { finalize } from 'rxjs';
import { UserApi } from '../../../core/api-service/user.api';
import { CommonService } from '../../../core/helper/common.service';
import { UserProfile } from '../../../core/models/user-profile.model';
import { Messages } from '../../../utils/validation-messages';
import { FullNamePipe } from '../../pipes/full-name.pipe';
import { ChangeEmail } from '../comman/change-email/change-email';
import { ChangePassword } from '../comman/change-password/change-password';
import { ChangePhoneNumber } from '../comman/change-phone-number/change-phone-number';
import { EditPersonalInfo } from './edit-personal-info/edit-personal-info';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatButtonModule, MatDialogModule, MatCheckboxModule, FullNamePipe ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {

  readonly dialog = inject(MatDialog);
  profile: UserProfile | null = null;;

  constructor(private userApi: UserApi, private commonService: CommonService, private cd: ChangeDetectorRef) { 
    
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.userApi.getProfile().pipe(
      finalize(() => this.commonService.hideLoader())
    ).subscribe({
      next: (res: any) => {
        this.profile = res.data
        this.cd.detectChanges();
      },
      error: () => alert(Messages.PROFILE.FETCH_FAILED)
    });
  }

  changePassword() {
    this.dialog.open(ChangePassword, {
      width: '610px',
      panelClass: 'modal--wrapper',
      autoFocus: false
    });
  }

  editPersonalInfo() {
    const dialogRef = this.dialog.open(EditPersonalInfo, {
      width: '610px',
      panelClass: 'modal--wrapper',
      autoFocus: false,
      data: this.profile
    });

    dialogRef.afterClosed().subscribe((updated) => {
      if (updated) {
        this.loadProfile(); // ✅ refresh without reload
      }
    });
  }

  // alert() {
  //   this.dialog.open(AlertDialog, {
  //     width: '510px',
  //     panelClass: 'modal--wrapper',
  //     autoFocus: false,
  //     data: {
  //       title: 'Warning',
  //       message: 'Are you sure you would like to proceed with this?',
  //       button1: 'Yes',
  //       button2: 'May be',
  //       button3: 'No',
  //     }
  //   });
  // }
  changeEmail() {
    this.dialog.open(ChangeEmail, {
      width: '510px',
      panelClass: 'modal--wrapper',
      autoFocus: false,
    });
  }
  changePhoneNumber() {
    this.dialog.open(ChangePhoneNumber, {
      width: '510px',
      panelClass: 'modal--wrapper',
      autoFocus: false,
    });
  }



}
