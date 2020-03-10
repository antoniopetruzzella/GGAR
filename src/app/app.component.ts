/// <reference path="WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      /** Enter your Wikitude (trial) License Key here. You can register and download your free license key here: http://www.wikitude.com/developer/licenses */      
      WikitudePlugin._sdkKey = "XjM9jYAU53+ub8+M++ir2kCMNBHl18i2XWeUsgED++IvXKDrA1Vnd+2bhTmrlt4ZQ9T1o4umhhv4YujW3BkD7/gz3clZioIwdrrPaQZqL7ukbFMUFmRe4DlEpHc1ubgc3BSs6+EJteSNnTdZqhIUbHRdLRXxmm3TaER7UlJ9XH9TYWx0ZWRfX/GjgL7r3OdSuAdOcyqhm3EcwEUI9dzCXv0Xhz8W3SNWju4oZtwEfSoQu1E0pbaBja7emhUZQ4W7X0ObfoLs9/YcSLDEJw9n8nygFp5g8VVH2jBXakeKtFfnJNcLs2ClhNsetQdOjwY7llZlJgxQIS59jOg11vp7CLb3375Sjazck2cwa5KuwPqTQqRaO4viDycC2ULeqQqA+ziJGyzhwZHLeWBEWEmiud/+bRzkEpOp6WWTQqoCO7wAx+8eyzGUdeTesPuftdJltCA6OGvNYzdCJuHj6F+yg+GBHvLn6JOIxeGnfJ4xe7Nei7jPNgbM4TbOeR6VT2xqEbLwl9eAEWuqUEWbN04Lhuq0i4h3/KbH5GtAQiyzW6SMGg1rxXNkbVNSAcV8Y5Jh4nuvCT8BdJVDNta+9Ircavzog7AKaUr2Su8/I7F5lpt81oKlbAejb4iHBQO14COeVgYYaGIa+DF3kK+AH5FfS5W7C7CsT8kntfAio3E0ncw=";
      
            /** Check if your device supports AR */
            WikitudePlugin.isDeviceSupported(
                function(success) {
                  console.log("Your platform supports AR/Wikitude. Have fun developing!!");
                },
                function(fail) {
                  console.log("Your platform failed to run AR/Wikitude: "+fail);
                },
                [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking 
            );                  
      
            /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works 
             * through the function below for the direction Ionic app --> Wikitude SDK 
             * For calls from Wikitude SDK --> Ionic app see the captureScreen example in 
             * WikitudeIonic3StarterApp/www/assets/07_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
            // set the function to be called, when a "communication" is indicated from the AR View  
            WikitudePlugin.setOnUrlInvokeCallback(function(url) {
      
              console.log("setOnUrlInvokeCallback ...");
              
              // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic2)
              if (url.indexOf('captureScreen') > -1) {
                  WikitudePlugin.captureScreen(
                      (absoluteFilePath) => {
                          console.log("snapshot stored at:\n" + absoluteFilePath);
      
                          // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
                          WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath +"');");
                      },
                      (errorMessage) => {
                          console.log(errorMessage);
                      },
                      true, null
                  );
              } else {
                  alert(url + "not handled");
              }
            });
      
            /**
             * Define the generic ok callback
             */
            WikitudePlugin.onWikitudeOK = function() {
                console.log("Things went ok.");
            }
            
            /**
             * Define the generic failure callback
             */
            WikitudePlugin.onWikitudeError = function() {
                console.log("Something went wrong");
            }
      
            // Just as an example: set the location within the Wikitude SDK, if you need this (You can get the geo coordinates by using ionic native 
            // GeoLocation plugin: http://ionicframework.com/docs/v2/native/geolocation/
            //WikitudePlugin.setLocation(47, 13, 450, 1);
      
            /* for Android only
            WikitudePlugin.setBackButtonCallback(
                () => {
                    console.log("Back button has been pressed...");
                }
            );                  
            */
            
    });
  }
}
