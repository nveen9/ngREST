import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import { UserService } from './service/user.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  userData: any;

  displayedColumns: string[] = ['id', 'title', 'category', 'description', 'date', 'amount', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _formD: MatDialog, private userService: UserService){}

  ngOnInit(): void {
    this.getUserData();
  }

  formComp(){
    const dialogR = this._formD.open(FormComponent);
    dialogR.afterClosed().subscribe({
      next: (value) => {
        if (value){
          this.getUserData();
        }
      }
    })
  }

  getUserData() {
    this.userService.getData().then(res => {
      console.log(res.data);
      this.userData = res.data;
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }).catch(err => {
      console.log(err);
    })
  }

  deleteUserData(id: number){
    if(confirm('Are you sure you want to delete')){
      this.userService.deleteData(id).then(res => {
        console.log(res);
        alert('Deleted');
        this.getUserData();
      }).catch(error => {
        console.log(error);
      })
    }
  }

  updateUserData(data: any){
    const dialogR = this._formD.open(FormComponent, { data });
    dialogR.afterClosed().subscribe({
      next: (value) => {
        if (value){
          this.getUserData();
        }
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
