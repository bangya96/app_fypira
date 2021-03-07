import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {LoadingController, ModalController, NavController} from "@ionic/angular";
import {AuthService} from "../services/auth.service";
import {AlertService} from "../services/alert.service";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {

  constructor(
      private modalController: ModalController,
      private authService: AuthService,
      private navCtrl: NavController,
      private alertService: AlertService,
      private appComponent: AppComponent,
  ) { }

  ngOnInit() {
  }

  submit(form: NgForm) {
    this.appComponent.showLoader();
    this.authService.book(form.value.date, form.value.time, form.value.service).subscribe(
        data => {
          this.appComponent.hideLoader();
          console.log(data);
          // this.alertService.presentToast("Logged In");
        },
        error => {
          console.log(error);
          // this.alertService.presentToast(error['error']['error']);
          this.alertService.presentToast("Please fill all the form");
          this.appComponent.hideLoader();
        },
        () => {
          this.alertService.presentToast("Your Appointment on review by Admin");
          this.navCtrl.navigateRoot('/home');
        }
    );
  }

}
