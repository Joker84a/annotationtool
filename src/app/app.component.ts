import { Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit{

  ngAfterViewInit(): void {}
  
  constructor(private auth:AuthenticationService) {
    this.initializeApp();
    
  }

  initializeApp() {
   
  }
}
