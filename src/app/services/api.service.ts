import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  // api call to login
  login(acno:any,pswd:any){
const body={
  acno,
  pswd
}
return this.http.post('http://localhost:3000/login',body)
  }
// api call to register
register(acno:any,pswd:any,uname:any){
  const body={
    acno,
    pswd,
    uname
  }
  return this.http.post('http://localhost:3000/register',body)
    }

    // function to append the token in the request header
    appendTocken(){
    const token =localStorage.getItem("token")
    let headers=new HttpHeaders()
    if(token){
      headers=headers.append('x-acces-token',token)
      options.headers= headers
    }
    return options
    }
    // api call to deposit
deposit(acno:any,pswd:any,amount:any){
  const body={
    acno,
    pswd,
    amount
  }
  return this.http.post('http://localhost:3000/deposit',body,this.appendTocken())
    }


    // api call to withdraw
    withdraw(acno:any,pswd:any,amount:any){
  const body={
    acno,
    pswd,
    amount
  }
  return this.http.post('http://localhost:3000/withdraw',body,this.appendTocken())
    }


    // api for getbalance

balance(acno:any){
  const body={
    acno
    
  }
  return this.http.post('http://localhost:3000/getBalance',body,this.appendTocken())

}

// api for transaction

transaction(acno:any){
  const body={
    acno
    
  }
  return this.http.post('http://localhost:3000/gettransaction',body,this.appendTocken())

}

// api for acno deletion
deleteAccount(acno:any){
  return this.http.delete('http://localhost:3000/deleteAccount/'+acno,this.appendTocken())

}

}


