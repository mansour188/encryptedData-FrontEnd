import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInResponce } from '../models/sign-in-responce.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private base="http://localhost:3000/"
  constructor(private http:HttpClient) { }
  signUp=(user:any)=>{
    return this.http.post(this.base+"signup",user)  }


    signIn=(user:any)=>{
     return this.http.post<SignInResponce>(this.base+"signin",user)
    }



    getUserRoleFromToken=(token:any)=> {
      const tokenParts = token.split('.');
    
      const payload = tokenParts[1];
    
      const decodedPayload = atob(payload);
    
      // Parse the JSON payload to access its contents
      const payloadData = JSON.parse(decodedPayload);
    
      const userRole = payloadData.role;
    
      return userRole;
    }
}
