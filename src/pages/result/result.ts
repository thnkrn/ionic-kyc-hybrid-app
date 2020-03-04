import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";


@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})

export class ResultPage {

  public similarity:any;
  public validData:any;
  public facesnull:any;
  public sourceImage:any = this.global.sourceImage;
  public targetImage:any = this.global.targetImage;
  
 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public global: GlobalProvider
  )
   {

    this.facesnull = this.global.facesnull;

    if(this.facesnull == null ){
      this.similarity = "not match";
      this.validData = this.global.IDvalid;
    } else {
      this.similarity = this.global.similarity;
      this.validData = this.global.IDvalid;
    }
    
  }

}
