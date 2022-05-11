import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { FirebaseService } from 'src/app/services/firebase.service';
import { IoUtilsService } from 'src/app/services/io-utils.service';

Chart.register(...registerables);
@Component({
  selector: 'app-showdata',
  templateUrl: './showdata.page.html',
  styleUrls: ['./showdata.page.scss'],
})
export class ShowdataPage implements OnInit {

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  barChart: any;

  constructor(private firestoreService: FirebaseService,
    private io: IoUtilsService) {

   }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.firestoreService.readImageByStatus().subscribe(res =>{
      console.log('ciao')
      if(res.length!=0){
        this.barChartMethod(this.io.concatLenght(res));
      }
    });  
  }

  barChartMethod(data) {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: data,
        datasets: [{
          label: '# di Annotazioni per immagine',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
       
    }
    });
  }


  upload(){
    this.io.readJsonData('../../assets/params/Parameters.json').then(res => {
      for(var i in res){
        this.firestoreService.createImage(this.setPath(res[i]), "0", false, [""])
        .then(() => {
            console.log("aggiunta corretamente")
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
        });
      }
      this.io.showSuccessMessage("Fine Upload")
    });
  }

  setPath(name){
    const link = `../../assets/dataset/${name}`
    return link;
  }

  download(){
    
  }

}
