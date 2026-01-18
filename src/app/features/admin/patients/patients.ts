import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

export interface UserData {
  id: number;
  patient: string; 
  status: string;
}

@Component({
  selector: 'app-patients',
imports: [CommonModule ,MatButtonModule,MatDialogModule,MatIconModule,MatFormFieldModule,MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './patients.html',
  styleUrl: './patients.scss',
})
export class Patients implements AfterViewInit {

  displayedColumns: string[] = [
    'id',
    'patient', 
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
}

/* ---------- DUMMY DATA (50 RECORDS) ---------- */

const STATUS = ['Completed', 'Incomplete '];

const USER_DATA: UserData[] = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1, 
  patient:['John Michael Smith', 'David Andrew Johnson','Robert James Miller', 'Daniel Thomas Wilson'][i % 4],
  status: STATUS[i % STATUS.length],
}));
