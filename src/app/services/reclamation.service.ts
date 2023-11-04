import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  

  private base="http://localhost:3000/reclamations/"
  private  base1="http://localhost:3000/add/"
  constructor(private http:HttpClient) { }
  getReclamationById=()=>{
    const userId=localStorage.getItem("userId")
     const token=localStorage.getItem("token")
   if(token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
   
    return this.http.get<any[]>(this.base+userId,{headers})
  }
  
  return new Observable<any[]>();

  }

  addReclamation=(data:Object)=>{
    const userId=localStorage.getItem("userId")
     const token=localStorage.getItem("token")
   if(token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
   
    return this.http.post(this.base1+userId,data,{headers})
  }
  
  return new Observable<any>();

  }



  getReclamations=()=>{
    
     const token=localStorage.getItem("token")
   if(token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
   
    return this.http.get<any[]>(this.base,{headers})
  }
  
  return new Observable<any[]>();

  }


}
