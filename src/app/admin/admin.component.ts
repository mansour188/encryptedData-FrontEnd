import { Component } from '@angular/core';
import { ReclamationService } from '../services/reclamation.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  reclamations:any[]=[]
  email:string|null= localStorage.getItem("email")
  firstName:string|null= localStorage.getItem("firstName")
  lastName:string|null= localStorage.getItem("lastName")
  post:string|null= localStorage.getItem("post")
  phone:string|null= localStorage.getItem("phone")
  
  constructor(private reclSer:ReclamationService,private toastr: ToastrService,private router:Router){}
  ngOnInit(): void {
    this.reclSer.getReclamations().subscribe({
      next:(recs)=>{
        this.reclamations=recs
        this.reclamations.reverse()
      },
      error:(err)=>{
        console.log(err)
      }
    })
    
  }


  LougOut=()=>{
    const name=localStorage.getItem("firstName")
    localStorage.clear()
    this.router.navigate(["/signIn"])
    this.toastr.info("good by "+name)

  }



}
