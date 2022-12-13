import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  eMsg=""
  user=""
  balance=""
   // deposit form
   depositForm =this.fb.group({
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private fb:FormBuilder,private api:ApiService,private router:Router) { }

  ngOnInit(): void {

5
  } deposit(){
    if(this.depositForm.valid){
      let acno=this.depositForm.value.acno
      let pswd=this.depositForm.value.pswd
      let amount=this.depositForm.value.amount
  
      // asynchronous
      this.api.deposit(acno,pswd,amount).subscribe(
        // response 200
        (result:any)=>{
        console.log(result);
        alert(result.message)
        // this.msg=result.message
        // setTimeout(() => {
         //this.router.navigateByUrl('')
  
        //   }, 2000);
  
        
      },
      
      (result:any)=>{
        this.eMsg=result.error.message
        // alert(result.error.message)
      }
      
      )
      
      }
      else{
        alert('invalid form')
      }
  }

  

}



