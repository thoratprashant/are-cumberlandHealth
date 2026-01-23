 


import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';

export interface UserData {
  id: number;
  patient: string;
  provider: string;
  requestedOn: string;
  status: string;
}

@Component({
  selector: 'app-history',
  providers: [provideNativeDateAdapter()],
  imports: [
    OwlDateTimeModule, OwlNativeDateTimeModule,
    CommonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './history.html',
  styleUrl: './history.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class History implements AfterViewInit {

  displayedColumns: string[] = [
    'id',
    'patient',
    'provider',
    'requestedOn',
    'status',
    'action'
  ];

  dataSource = new MatTableDataSource<UserData>(USER_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fromDateControl = new FormControl<Date | null>(null);
  onDateInput(event: any): void {
    if (event.value) {
      const selectedDate = event.value.toISOString().split('T')[0];
      console.log('From date:', selectedDate); // Use for filtering, e.g., ECG reports
    }
  }

}

const STATUS = ['Completed', 'Cancel', 'No Show', 'Rejected',];

const USER_DATA: UserData[] = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  patient: ['James D. Roger', 'Dan Mason', 'Emily Johnson', 'Michael Brown'][i % 4],
  provider: ['James Carter', 'Emily Roberts', 'NA', 'Michael Thompson'][i % 4],
  requestedOn: ['12/12/25 12:29AM', '12/13/25 12:29PM', '12/13/25 04:29AM', '12/14/25 10:29AM'][i % 4],
  status: STATUS[i % STATUS.length],
}));
