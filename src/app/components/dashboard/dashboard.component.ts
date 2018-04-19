import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { User } from '../../modals/user';
import { UserserviceService } from '../../services/userservice.service';
import { ToastrService } from 'ngx-toastr';
//import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    public currentUser: User;
    public users = [];
 
    constructor(private userService: UserserviceService, private toastr: ToastrService, private route:ActivatedRoute, private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
 
    ngOnInit() {
        this.loadAllUsers();
    }
 
    deleteUser(id) {
        this.userService.delete(id).subscribe(() => { 
           this.loadAllUsers()
         this.toastr.success('User Deleted Sucessfully..!!');
        });
    }
 
    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

}