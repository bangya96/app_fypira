import { Component, OnInit } from '@angular/core';
import {MenuController, NavController, Platform} from "@ionic/angular";
import {AuthService} from "../services/auth.service";
import {AlertService} from "../services/alert.service";
import {AppComponent} from "../app.component";
import {Edit, User} from "../models/user";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.page.html',
  styleUrls: ['./edituser.page.scss'],
})
export class EdituserPage implements OnInit {

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
  ) {
    this.menu.enable(true);
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.appComponent.showLoader();

    await this.authService.idUser(this.edit['id']).subscribe(
        data => {
          this.data = data['data'];
          console.log(data)
        }
    );

    this.subscription = this.platform.backButton.subscribe(()=>{
      navigator['app'].exitApp();
    });
    this.appComponent.hideLoader();
  }

  save(form: NgForm) {
    this.appComponent.showLoader();
    this.authService.saveUser(form.value, this.edit['id']).subscribe(
        data => {
          this.appComponent.hideLoader();
          this.data = data['data'];
          this.alertService.presentToast("Update Success");
          // this.alertService.presentToast("Logged In");
        },
        error => {
          console.log(error);
          // this.alertService.presentToast(error['error']['error']);
          this.alertService.presentToast("Invalid data");
          this.appComponent.hideLoader();
        }
    );
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }

}
