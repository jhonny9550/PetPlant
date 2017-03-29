import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { matchingPasswords } from '../../validators/matchingPassword';

import { InformationPage } from '../information/information';

import { Auth } from '../../providers/auth.provider';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

  regForm:any;
  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder,
    public auth: Auth, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.regForm = fb.group({
      user: ['',Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(20)])],
      pass: ['',Validators.compose([Validators.required,Validators.minLength(6)])],
      Cpass: ['',Validators.required],
      email: ['',Validators.compose([Validators.required,EmailValidator.isValid])],
      legals: [false,Validators.required]
    },{validator:matchingPasswords('pass','Cpass')});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  onReg(){
    this.loading = this.loadingCtrl.create({dismissOnPageChange:true});
    this.loading.present();
    this.auth.signUp(this.regForm.controls).then(()=>{
      this.navCtrl.setRoot(InformationPage);
    }).catch(err=>{
      let alert = this.alertCtrl.create({
        title: 'Error de registro',
        subTitle: 'El nombre de usuario que estás ingresando se encuentra registrado',
        buttons: [{
          text: 'Ok',
          role: 'cancel'
        }]
      });
      alert.present();
    });
  }

}
