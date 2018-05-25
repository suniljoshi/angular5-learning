import { Component,ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { User } from '../../modals/user';
import { UserserviceService } from '../../services/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { Hero } from '../../hero';
import { HeroService } from '../../hero.service';
import { MatTableDataSource,  MatSort, MatPaginator } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import * as Rx from 'rxjs/Rx';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public p: number = 1;
    public currentUser: User;
    public users = [];
    public heroes;// : Hero[];
    public createuser = {
        id:null,
        name:'',
        email:'',
        mobile:null,
    }

   public userAction = 'add';
   public dataSource = new MatTableDataSource();
   public limit = 5;
   public skip = 0;
   public totalLength = 0;
   public pageIndex  = 0;
   public pageLimit = [5, 10] ; 
   public filter = ''
   public displayedColumns;
   public sortby = 'id';

    constructor( private spinnerService: Ng4LoadingSpinnerService, private http: HttpClient,private heroService: HeroService, private userService: UserserviceService, private toastr: ToastrService, private route:ActivatedRoute, private router: Router) {
        this.displayedColumns = ['id', 'name', 'email', 'mobile'];
        
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); 
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
        console.log(this.dataSource.filteredData)
            this.filter = filterValue;
           this.getData(0);
      }
      
      sortServerSide(param){
          if(param ==  this.sortby){
            param = '-'+param 
          }
          else if(param == this.sortby.split("-").pop()){
            param = param
          }

          this.sortby = param;
          this.getData(0)
      }
    getHeroes(): void {
        this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
      }


    ngOnInit() {
        this.loadAllUsers();     
    }

    ngAfterViewInit() {
        setTimeout(() => {
         this.getData(0);
     
       })
     }

     getData(set){
        this.spinnerService.show();
        console.log(this.filter);
        this.userService.getDataServerPagination(this.limit,this.skip,0, this.filter, this.sortby).subscribe(Usersdata => { 
           setTimeout(() => {
              if(Usersdata){
              if(Usersdata.data != undefined){
            this.spinnerService.hide();
            this.dataSource.data = Usersdata.data;
            if( this.totalLength == 0){
                this.totalLength = Usersdata.total;
            }
              }
           }

       },2000)
           
          
         });
      
      }


      changePage(event){
        console.log('event',event)
        if(event.pageSize !== this.limit){
           console.log(1)
              this.limit = event.pageSize;
              this.skip = event.pageSize * event.pageIndex;
              this.getData(0)
        }else{
        if(this.totalLength > this.dataSource.data.length){
            console.log(2)
             this.skip = event.pageSize * event.pageIndex;
            this.getData(0)
          }
        }  
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
 
    loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users;
            console.log(this.users) });
    }

}