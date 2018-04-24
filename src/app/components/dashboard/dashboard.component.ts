import { Component,ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { User } from '../../modals/user';
import { UserserviceService } from '../../services/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { Hero } from '../../hero';
import { HeroService } from '../../hero.service';
import {MatTableDataSource, MatSort} from '@angular/material';

//import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public p: number = 1;
    public currentUser: User;
    public users = [];
    public heroes : Hero[];
    public createuser = {
        id:null,
        name:'',
        email:'',
        mobile:null,
    }

    public userAction = 'add';
    constructor(private heroService: HeroService, private userService: UserserviceService, private toastr: ToastrService, private route:ActivatedRoute, private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.heroService.getHeroes()
        
        .subscribe(heroes => { this.heroes = heroes
     
        });
    }
 
    getHeroes(): void {
        this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
      }


    ngOnInit() {
        this.loadAllUsers();
    }

    addUser(){
        this.heroService.addHero(this.createuser)
        .subscribe(hero => {

          this.heroes.push(hero);
          this.createuser = {
            id:null,
            name:'',
            email:'',
            mobile:null,
        }
        this.toastr.success('User Added Sucessfully..!!');
        });
    }

    getUserByid(id){
        this.heroService.getHero(id)
        .subscribe(hero => {
            console.log(hero)
            this.createuser = hero;
            this.userAction = 'update'
        });
    }

    checkAction(){
        if(this.userAction == 'update'){
            this.editUser()
        }
        else{
            this.addUser()
        }
    }

    editUser(){
        console.log(this.createuser);
        this.heroService.updateHero(this.createuser)
        .subscribe(hero => {
            console.log(hero)
            this.userAction = 'add',
            this.createuser = {
                id:null,
                name:'',
                email:'',
                mobile:null,
            }
            this.toastr.success('User Updated Sucessfully..!!');
            this.getHeroes()
         
        });
    }
 
    deleteUser(id) {
        this.heroService.deleteHero(id)
        .subscribe(res => {
            console.log(res)
            this.toastr.success('User deleted Sucessfully..!!');
            this.getHeroes()
        });

    }
 
    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

}