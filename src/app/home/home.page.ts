import { Component, OnInit } from '@angular/core';
import { MenuController, Platform  } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import {Edit, User} from 'src/app/models/user';
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
  edit = Edit ;
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

  async ionViewWillEnter() {
      this.appComponent.showLoader();
    this.authService.user().subscribe(
        user => {
          this.user = user["success"];
          this.edit['roles'] = user["success"]['roles'];
            this.appComponent.hideLoader();
        },
        error => {
          this.appComponent.logout();
            this.appComponent.hideLoader();
          console.log(error);
        }, ()=> {
          this.authService.getappointment().subscribe(
              getappointment => {
                console.log(this.user['roles'])
                if (this.user['roles'] === 'admin'){
                  this.getappointment = getappointment['data'].filter(function(data:any) {
                    return data.completed === null;
                  });
                } else if (this.user['roles'] === 'user') {
                  this.getappointment = getappointment['data'];
                }
              }
          );
        },
    );
    this.authService.slider().subscribe(
        slider => {
          this.items = slider;
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

  history(){
    this.navCtrl.navigateRoot('/history');
  }

    allusers(){
    this.navCtrl.navigateRoot('/allusers');
  }

  contact(no){
    window.open("https://wasap.my/6"+no,'_system', 'location=yes')
  }

  changeStatus(status, id){
    this.authService.changeStatus(status, id).subscribe(
        data => {
          console.log(data);
        },
        error => {
        },
        () => {
          this.ionViewWillEnter()
        }
    );
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }

}
