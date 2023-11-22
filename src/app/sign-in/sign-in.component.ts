import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  isChecked:boolean=false
  
  sginUpData:{firstName:string, lastName:string, email:string, phone:string, post:string, password:string}={firstName:"", lastName:"", email:"", phone:"", post:"", password:""}
  sginInData:{email:string, password:string}={email:"",password:""}
  constructor(private auth:AuthService,private toastr: ToastrService,private router: Router){}
  hendelSignUp=(e:Event)=>{
    e.preventDefault();
    this.auth.signUp(this.sginUpData).subscribe({
      next:(data)=>{
        console.log(data)
        
        this.toastr.success("congrats account created ","created  😉")
        this.sginUpData={firstName:"", lastName:"", email:"", phone:"", post:"", password:""}

      this.isChecked=true
      },
      error:(error)=>{console.log(error)
      if(error.status==409){
        this.toastr.error("account already exist","error 🤷‍♀️")

      }else{
      this.toastr.error("server side error")
      }
      }
    })

    

  }
  hendelSignIn=(e:Event)=>{
    e.preventDefault();
    console.log(this.sginInData)
    this.auth.signIn(this.sginInData).subscribe({
      next:(data)=>{
        console.log(data.user)
       
     
     
        localStorage.setItem("token",data.token)
        localStorage.setItem("email",data.user.email)
        localStorage.setItem("firstName",data.user.firstName)
        localStorage.setItem("lastName",data.user.lastName)
        localStorage.setItem("post",data.user.post)
        localStorage.setItem("phone",data.user.phone)
        localStorage.setItem("userId",data.user._id)
       

        
       
       
        this.toastr.info(`welcom 🤗🤗 ${data.user.firstName} `)
        this.sginInData={email:"",password:""}

        const role=this.auth.getUserRoleFromToken(data.token)
        if(role=='USER'){
          this.router.navigate(["/home"])
        } if(role=='RESPONSABLE'){
          this.router.navigate(["/admin"])
        }

      },
      error:(err)=>{
        console.log(err)
        this.toastr.error("check your email or password please","Unauthorized")

      }
    })

  }

}
