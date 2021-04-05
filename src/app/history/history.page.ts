import { Component, OnInit } from '@angular/core';
import {MenuController, NavController, Platform} from "@ionic/angular";
import {AuthService} from "../services/auth.service";
import {AlertService} from "../services/alert.service";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  public getappointment = [];
  public subscription;

  constructor(
      private menu: MenuController,
      private authService: AuthService,
      private alertService: AlertService,
      private navCtrl: NavController,
      private appComponent: AppComponent,
      private platform: Platform,
  ) {
    this.menu.enable(true);
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.appComponent.showLoader();
    this.authService.getappointment().subscribe(
        getappointment => {
          this.getappointment = getappointment['data'].filter(function(data:any) {
            return data.completed != null;
          });
        }
    );

    this.subscription = this.platform.backButton.subscribe(()=>{
      navigator['app'].exitApp();
    });
    this.appComponent.hideLoader();
  }

}
