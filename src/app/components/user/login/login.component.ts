import { Component, OnInit, OnDestroy} 		     from '@angular/core';
import { Router, ActivatedRoute, Params }	 	 from '@angular/router';
import { User } 								 from 'src/app/models/user';
import { UserService }    						 from 'src/app/services/user/user.service';
import { TemplateService }                       from 'src/app/services/template/template.service';
import Swal								 	     from 'sweetalert2';
import { Subscription }                          from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
  })
export class LoginComponent implements OnInit{
	 title: string;
	 user: User;
	 token;
	 identity; 
	 role; 
	 status: string; 
	 activar:string=''; 
	 loginSubscription: Subscription; 



	constructor (
		private _route: ActivatedRoute,
		private _router: Router,
        private _userService: UserService,
	    public _templateService:TemplateService
		){
		this.title = 'Loguearse';
		this.user = new User(1,'','','','','',1);
	}
	ngOnInit(){
		//console.log('login.component cargado correctamente!!!');
		this.logout();	

		this.loginSubscription= this._templateService.login_obs.subscribe(
			response=>{
		//	  console.log(response);
			  if(response==true){
		//		console.log('Mostrar el Menú');
				this.activar='active';
			  }else{
				if(response==false){
		//		  console.log('No mostrar el Menú');
				  this.activar='';
				}
			  }
			}
		  );
	} 

	ngOnDestroy(){
		this.loginSubscription.unsubscribe(); 
	   }

	onSubmit(form){
			this._userService.signup(this.user).subscribe(
								response=> 
								{
								//	Token
								console.log(response.status);
									if(response.status != 'error'){
									this.status='success'; 
									this.token = response; 
                               	//Se crea un elemento en el local storage //
									localStorage.setItem('token',this.token);
									console.log('respuesta token'); 
									console.log(response); 
								//	Objeto Usuario Identificado
										this._userService.signup(this.user, true).subscribe(
																response=> {
														//			Token
																	console.log(response);
																	this.identity=response;
																	console.log(this.identity.activo); 
																	if(this.identity.activo==1){
																	console.log(this.identity.role); 
																	switch (this.identity.role) {
																		case  1: this.role="Administrador";
																			break;
																		case 2: this.role="Supervisor";
																			break;
 																		case 3: this.role="Tecnico";
																			break;
																		case 4: this.role="Programador";
																			break;
																		case 5: this.role="Operador";
																			break;
																		case 6: this.role="Npi";
																			break;
																		default:
																			return 	0;
																			break;
																	}
																	console.log(this.role); 

																	this.logueado(); 
																	//Se crea un elemento en el local storage //
																	localStorage.setItem('identity',JSON.stringify(this.identity));
																	console.log(response); 
																	this.activar='';
																	//this._templateService.identity_obs.emit(this.identity);

																	//Objeto Usuario Identificado
																	//Redireccion
																//	this._router.navigate(['home']); 

																}else{
																	this.usuarioBloqueado();
																	this._router.navigate(['home']);
																}

																},
																error=>{
																	console.log(<any>error); 
																}
												);

									}else{
										this.status='error'; 
										this.errorLogueo(); 

									}
			},
			error=>{
				console.log(<any>error); 
			}
			);
}





logueado(){
	
    Swal.fire({
     position: 'center',
     icon: 'success',
     title: 'Bienvenido '+this.identity.name+this.identity.surname,
     footer: 'Logueado como<b> ' +this.role+'</b>',
     showConfirmButton: false,
     timer: 1500
      })
    }
errorLogueo(){
	Swal.fire({
		icon: 'error',
		title: 'Error de logueo',
		text: 'No se reconoce usuario o contraseña',
		footer: 'Intente nuevamente, o contactese con el administrador del sistema'
	  })
}
usuarioBloqueado(){
	/*
    Swal.fire({
     position: 'center',
     type: 'error',
     title: 'Usuario Bloqueado',
     footer: 'Contacte al administrador del Sistmema',
     showConfirmButton: true,
     confirmButtonText: 'Entendido!'
	 })
	 */
    }

	logout(){
		this._route.params.subscribe(params => {
			let logout = +params['sure'];
			if(logout == 1){
				localStorage.removeItem('identity');
				localStorage.removeItem('token');
				this.identity= null;
				this.token=null;
					//Redireccionar 
				this._router.navigate(['home']);
				}
		
	});

}
	}
