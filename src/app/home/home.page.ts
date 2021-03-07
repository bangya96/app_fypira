import { Component, OnInit } from '@angular/core';
import { MenuController, Platform  } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { NavController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public items;
  public getappointment = [];
  user = User ;
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
    this.authService.user().subscribe(
        user => {
          this.user = user["success"];
            this.appComponent.hideLoader();
        },
        error => {
          this.appComponent.logout();
            this.appComponent.hideLoader();
          console.log(error);
        }
    );
    this.authService.slider().subscribe(
        slider => {
          this.items = slider;
        }
    );
    this.authService.getappointment().subscribe(
        getappointment => {
          this.getappointment = getappointment['data'];
          console.log(getappointment)
        }
    );

    this.subscription = this.platform.backButton.subscribe(()=>{
      navigator['app'].exitApp();
    });
  }

  logout(){
    this.appComponent.logout();
  }

  profile(){
    this.navCtrl.navigateRoot('/profile');
  }

  soon(){
    this.navCtrl.navigateRoot('/coming-soon');
  }

  appointment(){
    this.navCtrl.navigateRoot('/appointment');
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }

}
