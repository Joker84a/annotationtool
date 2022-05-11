import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { Image } from 'src/app/models/image';
import { IoUtilsService } from 'src/app/services/io-utils.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  image:Image;
  path="";
  answer = "None";
  isBusyUpdate = true;
  id;
  displayTutorial = true;
  slides;
  
  constructor(private authService:AuthenticationService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private firestoreService: FirebaseService, 
    private io: IoUtilsService,
    private alert: SweetAlert2Module
    ) {
    
  }

  ngOnInit() {
    const cookie = this.io.getCookie('fa');
    if(cookie == ""){
      this.io.setCookie('fa',true,10);
    } else {
      this.displayTutorial = false;
      this.firestoreService.getImage().then(image => {
        this.image = image;
        this.path = this.image.path;
        console.log('1')
      });
    }
  }

  next(){
    if(this.answer == "None"){
      this.io.showSuccessMessage('Seleziona una delle risposte prima di procedere');
    } else{
      this.path = "";
      this.image.annotations.push(this.answer);
      this.image.busy = false;
      this.firestoreService.updateImage(this.image.id, this.image);
      this.firestoreService.getImage().then(image => {
        this.image = image;
        this.path = this.image.path;
        this.answer = null;
      });
    }
  }

  checkValue(event){
    this.answer = event.value;
  }

  nextSlides(slides?: { slideNext: () => void; }){
    slides.slideNext();
  }

  reachedEnd() {
    this.displayTutorial = false;
    this.firestoreService.getImage().then(image => {
      this.image = image;
      this.path = this.image.path;
      console.log('1')
    });
  }
  
}
