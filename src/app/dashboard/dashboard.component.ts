import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isCollapse=true
 user=""
 balance=""
 acno=""
 deleteMsg=""
 eMsg=""
 confirmMsg=false
 isLogout:boolean=false
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit(): void {

    if(localStorage.getItem("username")){
    this.user=localStorage.getItem("username") ||''
    }

    //preventing going bac to dashbord
    if(!localStorage.getItem("token")){
      alert('please log in')
      this.router.navigateByUrl('')
    }
  }
  
  collapse(){
    this.isCollapse=!this.isCollapse
  }

  getBalance(){
    if(localStorage.getItem("currentAcno")){
      let acno =localStorage.getItem("currentAcno")
      this.api.balance(acno)
      .subscribe(
        //response 2xx
        (result:any)=>{
          this.balance=result.message
          
        },
        // response 4xx
        (result:any)=>{
          this.balance=result.error.message
        }
      )
    }
  }

  // logout function
  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("currentAcno")
    this.isLogout=true
    setTimeout(()=>{
      this.router.navigateByUrl('')
    },2000)

  }

  // deleteacno
  deleteAcno(){

    if(localStorage.getItem('currentAcno')){
      this.acno = localStorage.getItem('currentAcno') ||''
    }

  }

  // cancel
  cancel(){
    this.acno=""
  }


  // deleteParent
  deleteParent(event:any){
    console.log(event);
    this.confirmMsg=event[1]
    
  this.api.deleteAccount(event[0])
  .subscribe(
    // response 2xx
    (result:any)=>{
    this.acno=""
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("currentAcno")
    this.deleteMsg=result.message
    // alert(this.deleteMsg)
    setTimeout(() => {
      this.router.navigateByUrl('')

    },2000);

    
    },
    // response 4xx
    (result:any)=>{
      this.eMsg=result.error.message
    }

  )
  }
}
