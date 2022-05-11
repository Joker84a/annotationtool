import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class IoUtilsService {

  	constructor() { }

	getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

  	private initToastSwal(timer=3000){
		return Swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: timer,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer)
				toast.addEventListener('mouseleave', Swal.resumeTimer)
			}
		});
	}

	showSuccessMessage(message,timer=1500){
		const Toast =  this.initToastSwal(timer);
		Toast.fire({
			icon: 'error',
			title: message,
		});
	};

	getMinLenghtArray (arr){
		let min = Math.min(...arr.map(image => image.annotations.length))
		return arr.filter(arr => arr.annotations.length ==min);
	}

	concatLenght(arr){
		return[...arr.map(image => image.annotations.length)]
	}


	base64ToImage(dataURI) {
		const fileDate = dataURI.split(',');
		// const mime = fileDate[0].match(/:(.*?);/)[1];
		const byteString = atob(fileDate[1]);
		const arrayBuffer = new ArrayBuffer(byteString.length);
		const int8Array = new Uint8Array(arrayBuffer);
		for (let i = 0; i < byteString.length; i++) {
		  int8Array[i] = byteString.charCodeAt(i);
		}
		const blob = new Blob([arrayBuffer], { type: 'image/png' });
		return blob;
	}

	readJsonData(path){    
		return fetch(path ).then(res=>res.json());
	}

	setCookie(cname, cvalue, exdays) {
		const d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		let expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	getCookie(cname) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++) {
		  let c = ca[i];
		  while (c.charAt(0) == ' ') {
			c = c.substring(1);
		  }
		  if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		  }
		}
		return "";
	  }
}
