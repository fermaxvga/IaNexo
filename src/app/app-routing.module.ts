import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NuevoComponent } from './components/procedimientos/nuevo/nuevo.component';
import { LoginComponent } from './components/user/login/login.component';
NuevoComponent

const routes: Routes = [
  {path: 'nuevo-procedimiento', component: NuevoComponent},
  {path: 'logout/:sure', component: LoginComponent},
  {path: '**', pathMatch:'full',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
