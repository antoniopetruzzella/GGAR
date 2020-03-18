/// <reference path="../../app/WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Arazzi Page');
  }

  ionViewDidEnter() {

      this.ionLoadArchitectWorld();
  }
  ionLoadArchitectWorld(){
    var startupConfiguration: any = {"camera_position": "back"};

    WikitudePlugin.loadARchitectWorld(
        function(success) {
          console.log("ARchitect World loaded successfully.");
        },
        function(fail) {
          console.log("Failed to load ARchitect World!");
        },          
          //"www/assets/07_3dModels_1_3dModelOnTarget/index.html", // (1) if you have a IR (Image Recognition) World, use this
          //["ir"], // (1) if you have a IR (Image Recognition) World, use this
        "http://demo.ggallery.it/GGAR/S1/index.html",  // (2) if you have a GeoLocation World, use this
        ["geo"],  // (2) if you have a GeoLocation World, use this
// you find other samples or Wikitude worlds in Wikitude Cordova Plugin
// which can be downloaded from here: https://github.com/Wikitude/wikitude-cordova-plugin/archive/v5.3.1-3.3.2.zip
       <JSON>startupConfiguration
    );
  }

}
