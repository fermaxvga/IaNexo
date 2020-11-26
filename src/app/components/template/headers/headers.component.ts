import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { faBars,faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { TemplateService } from 'src/app/services/template/template.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css'],
  providers: [UserService]
})
export class HeadersComponent implements OnInit, DoCheck {
  title = 'frontEnd';
  bar=faBars;
  sigIn=faSignInAlt; 
  sigOut=faSignOutAlt;
  verMenu :boolean=true;
  verLogin:boolean=false;
  identity;
  token;
  role:string; 
  menuSubscription: Subscription; 
  identitySubscription: Subscription; 

  constructor(
    private _templateService:TemplateService,
    private _userService:UserService
  ) { 
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken(); 
  }

  ngOnInit(): void {
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    console.log(this.identity);
    console.log(this.token);
    this.menuSubscription= this._templateService.menu_obs.subscribe(
      response=>{
        if(response==true){
        }else{
          if(response==false){
            this.verMenu=false; 
          }
        }
      }
    );
   /*this.identitySubscription=this._templateService.identity_obs.subscribe(
    response=>{
       console.log('en header', response);
       this.identity=response; 
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
    }
   );

  */

  }

  ngOnDestroy(): void{
    this.menuSubscription.unsubscribe(); 
   }

   ngDoCheck(){
    this.identity=this._userService.getIdentity(); 
    this.token= this._userService.getToken();
}

  mostrarMenu(){
    if(this.verMenu==false){
      this._templateService.menu_obs.emit(true);
      this.verMenu=true; 
    }else{
      if(this.verMenu==true){
        this._templateService.menu_obs.emit(false);
         this.verMenu=false;
      }
    }
  }
  mostrarLogin(){
    if(this.verLogin===false){
      this.verLogin=true;
    //  console.log(this.verLogin);
      this._templateService.login_obs.emit(true);
    }else{
      if(this.verLogin===true){
        this.verLogin=false;
    //    console.log(this.verLogin);
        this._templateService.login_obs.emit(false);
      }
    }

  }

}
