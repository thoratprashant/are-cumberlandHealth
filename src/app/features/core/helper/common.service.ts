import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from '../../comman/loader/loader';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  private loaderDialogRef?: MatDialogRef<LoaderComponent>;

  constructor(private dialog: MatDialog,private toastr: ToastrService) {}

  showLoader(): void {
    if (!this.loaderDialogRef) {
      this.loaderDialogRef = this.dialog.open(LoaderComponent, {
        disableClose: true,
        panelClass: 'loader-dialog',
      });
    }
  }

  hideLoader(): void {
    this.loaderDialogRef?.close();
    this.loaderDialogRef = undefined;
  }

  showToastError(arg0: any): void {
    this.toastr.clear(); 
    this.toastr.error(arg0);
  }

  showToastSuccess(arg0: any): void {
    this.toastr.clear(); 
    this.toastr.success(arg0);
  }
}
