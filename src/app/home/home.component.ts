import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../services/reclamation.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  reclamations:any[]=[]
  email:string|null= localStorage.getItem("email")
  firstName:string|null= localStorage.getItem("firstName")
  lastName:string|null= localStorage.getItem("lastName")
  post:string|null= localStorage.getItem("post")
  phone:string|null= localStorage.getItem("phone")
  
  
 



    reclamation:{title:string,description:string}={title:'',description:''}
  constructor(private reclSer:ReclamationService,private toastr: ToastrService,private router:Router){}
  ngOnInit(): void {
    this.reclSer.getReclamationById().subscribe({
      next:(recs)=>{
        this.reclamations=recs
        this.reclamations.reverse()
      },
      error:(err)=>{
        console.log(err)
      }
    })
    
  }
  
  sendReclamation=(myForm: NgForm)=>{
    if (myForm.valid) {
      this.reclSer.addReclamation(this.reclamation).subscribe({
        next:(data)=>{ 
          myForm.resetForm();
          this.toastr.success("Reclamation added successufly","success")
          this.ngOnInit()
        },
        error:(err)=>{
          console.log(err)
        }
      })
      

    }


  }

  
  LougOut=()=>{
    const name=localStorage.getItem("firstName")
    localStorage.clear()
    this.router.navigate(["/signIn"])
    this.toastr.info("good by "+name)

  }



}
