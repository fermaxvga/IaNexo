import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public hoy:any;

  constructor() { }

  ngOnInit(): void {
    this.hoy= moment();
    this.hoy= this.hoy.format("DD/MM/YYYY");
    
  }

}
