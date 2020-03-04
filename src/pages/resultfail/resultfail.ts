import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";

@IonicPage()
@Component({
  selector: 'page-resultfail',
  templateUrl: 'resultfail.html',
})
export class ResultfailPage {

  public sourceImage:any = this.global.sourceImage;
  public targetImage:any = this.global.targetImage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global: GlobalProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultfailPage');
  }

}
