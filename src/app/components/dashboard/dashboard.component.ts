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
/*   public color = 'primary';
   public mode = 'Indeterminate';
   public value = 50;*/

    constructor(private http: HttpClient,private heroService: HeroService, private userService: UserserviceService, private toastr: ToastrService, private route:ActivatedRoute, private router: Router) {
        this.displayedColumns = ['id', 'name', 'email', 'mobile'];
    }
 
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); 
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
        
       
       // if(this.dataSource.filteredData ==  0){
          // console.log(this.dataSource)
            this.filter = filterValue;
           this.getData(0);
         //}
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
        console.log(this.filter);
        this.userService.getDataServerPagination(this.limit,this.skip,0, this.filter).subscribe(response => { 
           setTimeout(() => {
            console.log(response)
      
            this.dataSource.data = response.data;
            if( this.totalLength == 0){
                this.totalLength = response.total;
            }
              this.dataSource.sort = this.sort;

       },2000)
           
          
         });
      
      }


      changePage(event){
        console.log('event',event)
        if(event.pageSize !== this.limit){
           console.log(1)
              this.limit = event.pageSize;
              this.skip = event.pageSize * event.pageIndex;
              this.getData()
        }else{
        if(this.totalLength > this.dataSource.data.length){
            console.log(2)
             this.skip = event.pageSize * event.pageIndex;
            this.getData()
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
 
    loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users;
            console.log(this.users) });
    }

}