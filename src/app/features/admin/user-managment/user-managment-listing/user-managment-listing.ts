import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator'; 
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface UserData {
  id: number;
  name: string;
  emailid: string;
  role: string;
  status: string;
}

@Component({
  selector: 'app-user-managment-listing',
  standalone: true,
  imports: [CommonModule,RouterLink ,MatButtonModule, MatDialogModule,MatIconModule,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './user-managment-listing.html',
  styleUrl: './user-managment-listing.scss',
})
export class UserManagmentListing implements AfterViewInit {

  displayedColumns: string[] = [
    'id',
    'name',
    'emailid',
    'role',
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

const STATUS = ['Active', 'In-Active'];

const USER_DATA: UserData[] = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  // name: `name ${i + 1}`,
  name:['John Michael Smith', 'David Andrew Johnson','Robert James Miller', 'Daniel Thomas Wilson'][i % 4],
  emailid: ['john24.michael@lorem.com', 'david.andrew@lorem.com', 'robert.james.miller@lorem.com', 'daniel.thomas.wilson@lorem.com'][i % 4],
  role: ['Provider','Front Desk',][i % 2], 
  status: STATUS[i % STATUS.length],
}));
