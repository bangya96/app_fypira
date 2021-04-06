import { Component, OnInit } from '@angular/core';
import {MenuController, NavController, Platform} from "@ionic/angular";
import {AuthService} from "../services/auth.service";
import {AlertService} from "../services/alert.service";
import {AppComponent} from "../app.component";
import {Edit} from "../models/user";

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.page.html',
  styleUrls: ['./allusers.page.scss'],
})
export class AllusersPage implements OnInit {

  public data = [];
  public subscription;
  edit = Edit;

  constructor(
      private menu: MenuController,
      private authService: AuthService,
      private alertService: AlertService,
      private navCtrl: NavController,
      private appComponent: AppComponent,
      private platform: Platform,
      // private Edit: Edit,
  ) {
    this.menu.enable(true);
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.appComponent.showLoader();
    await this.authService.allUser().subscribe(
        data => {
          this.data = data['data'];
        }
    );

    this.subscription = this.platform.backButton.subscribe(()=>{
      navigator['app'].exitApp();
    });
    this.appComponent.hideLoader();
  }

  viewuser(id){
    this.edit['id'] = id;
    this.navCtrl.navigateRoot('/edituser');
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }

}
