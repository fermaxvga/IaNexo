import {Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } 	from '@angular/common/http'; 
import { Observable } 				from 'rxjs';
import { GLOBAL } 					from '../global';


@Injectable({
  providedIn: 'root'
})
export class UserService {
   url: string;
	 identity;
	 token;

  constructor(		
   public _http: HttpClient   
      )
   {this.url = GLOBAL.url}

   signup(user, gettoken=null): Observable<any>{
		if(gettoken != null){
			user.gettoken='true';
		}
		let json = JSON.stringify(user);
		let params = 'json='+json;
		console.log("parametros: "); 
		console.log(params);
		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
		return this._http.post(this.url+'login', params, {headers: headers});
  }
  
  //Funcipon para obtener el usuario de nuestro local storage
  getIdentity(){
		let identity=JSON.parse(localStorage.getItem('identity'));
		if(identity != "undefined"){
			this.identity = identity;
		}else{
			this.identity = null;
		}
		return this.identity;
	}

  //Funcipon para obtener el token de nuestro local storage
	getToken(){
		let token = localStorage.getItem('token');
		if(token != "undefined"){
			this.token = token;
		}else{
			this.token = null; 
		}
		return this.token; 

	}




}
