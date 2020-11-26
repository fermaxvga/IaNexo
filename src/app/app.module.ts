import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }			      	from '@angular/common/http'; 

/* COMPONENTES */
import { HeadersComponent } from './components/template/headers/headers.component';
import { SideBarComponent } from './components/template/side-bar/side-bar.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { IndexComponent } from './components/template/index/index.component';
import { NuevoComponent } from './components/procedimientos/nuevo/nuevo.component';
import { TemplateModule } from './components/template/template.module';
import { LoginComponent } from './components/user/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
    SideBarComponent,
    FooterComponent,
    IndexComponent,
    NuevoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    TemplateModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
