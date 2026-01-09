import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'; 
import { LoaderComponent } from '../../comman/loader/loader';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private loaderDialogRef?: MatDialogRef<LoaderComponent>;

  constructor(private dialog: MatDialog) {}

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
}
