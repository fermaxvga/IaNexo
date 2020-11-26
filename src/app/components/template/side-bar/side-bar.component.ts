import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TemplateService } from 'src/app/services/template/template.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit, OnDestroy{
  //menu: boolean=false; 
  menuSubscription: Subscription; 
  activar:string='active'; 

  constructor(
    public _templateService:TemplateService
    ) 
    {  }

  ngOnInit(): void {
   this.menuSubscription= this._templateService.menu_obs.subscribe(
      response=>{
     //   console.log(response);
        if(response==true){
       //   console.log('Mostrar el Menú');
          this.activar='active';
        }else{
          if(response==false){
         //   console.log('No mostrar el Menú');
            this.activar='';
          }
        }
      }
    );
  }

  ngOnDestroy(){
    this.menuSubscription.unsubscribe(); 
   }
  ocultarMenu(){
      this._templateService.menu_obs.emit(false);
      this.activar='';
    }


  }



