import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { Image } from '../models/image';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { collection, getDocs } from "firebase/firestore";

import { take } from 'rxjs/operators';
import { IoUtilsService } from './io-utils.service';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  image:Image;
  constructor(
    public firestore: AngularFirestore,
    private io: IoUtilsService
  ) { }

  createImage(path: string, label: string, busy: boolean, annotations: Array<string>): Promise<void> { 
    const id = this.firestore.createId();
    return this.firestore.doc(`dataset/${id}`).set({
      annotations: [''],
      label : label,
      busy: busy,
      path:path,
      id:id,
    });
  }

  readImages():Observable<Image[]>{
    return this.firestore.collection<Image>(`dataset`).valueChanges();
  }

  readImage(id:string):Observable<Image>{
    return this.firestore.doc<Image>(`dataset/${id}`).valueChanges();
  }

  readImageByStatus():Observable<Image[]>{
    return this.firestore.collection<Image>('dataset', ref => ref.where('busy','==', false )).valueChanges().pipe(
      take(1)
    )
  }

  updateImage(id, record) {
    this.firestore.doc('dataset' + '/' + id).update(record);
  }
    
  getImage():Promise<Image>{
    return new Promise(resolve => {
      this.readImageByStatus().subscribe(res => {
        if(res.length!=0){
          res = this.io.getMinLenghtArray(res);
          let image = res[this.io.getRandomInt(res.length)];
          image.busy=true;
          this.updateImage(image.id, image);
          resolve(image);
        }
      })
    });
  }
    
}
