import { Component } from '@angular/core';
import { NavController , AlertController, LoadingController} from 'ionic-angular';
import {Scan} from '../../assets/js/scan';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  scan : Scan;
  tieneCamaraYNoEsPc : boolean;
  
  
  constructor(public navCtrl: NavController, public alertCtrl : AlertController,public loadingCtrl : LoadingController) {
    
    this.tieneCamaraYNoEsPc = false;
    //this.detenerCamara = true;
    
  }

  ionViewDidEnter() {
    this.scan = new Scan();
    this.startScan();
  }

  startScan() {
    const loading = this.loadingCtrl.create();
    loading.present();

    setTimeout(() => {
    loading.dismissAll();
    this.tieneCamaraYNoEsPc = this.scan.tieneCamara() && this.scan.tieneCamaraTrasera();
    if (this.tieneCamaraYNoEsPc) {
      this.scanCode();
    }
    },1000)
  }


  scanCode() {
    this.scan.escanear('videoScan').then(response => {
      this.scan.reset();
      this.showResult(response)
    }).catch(error => {
      this.scan.reset();
      this.showResult(error);
    })
  }

  showResult(code) {
    const alert = this.alertCtrl.create({
      title : 'Resultado de escanéo',
      subTitle : code,
      buttons : [ {text: 'OK' , handler: () => {} } ]
    })
    alert.onWillDismiss(() => {
      if (this.tieneCamaraYNoEsPc) this.startScan();
    })
    alert.present();
  }









}
