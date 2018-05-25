import { Component, OnInit } from '@angular/core';
import { Liveapiservice } from '../../services/liveapi.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})

export class LiveComponent implements OnInit {

  public users;
   public title= 'demo';
   
  constructor(private _liveapi: Liveapiservice) {
     
     
  }
   
  ngOnInit() {
      this._liveapi.getAllUsers().subscribe(Userslive =>{
         this.users = Userslive;
         console.log(Userslive)
      })
  }

}
