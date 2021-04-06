import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../app.component';
import {AuthService} from '../services/auth.service';
import {NavController, Platform} from '@ionic/angular';
import {User, Edit} from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user = User ;
  edit = Edit ;
  public subscription;

  constructor(
      private authService: AuthService,
      private platform: Platform,
      private navCtrl: NavController,
      private appComponent: AppComponent,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.appComponent.showLoader();
    this.authService.user().subscribe(
        user => {
          this.user = user["success"];
          this.appComponent.hideLoader();
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
