import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http, Headers , RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import { GlobalProvider } from "../../providers/global/global";
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { IdcardformPage } from '../idcardform/idcardform';

@IonicPage()
@Component({
  selector: 'page-uploadidcard',
  templateUrl: 'uploadidcard.html',
})
export class UploadidcardPage {

  public image: any;
  public data: Observable<any>;
  public b64IDcard:any;
  result:any;
  public statusCheck:any = false;
  public statusNext:any = false;
  resultJson:any;
  resultID : any;
  resultGender:any;
  resultName:any;
  resultLastname :any;
  resultThainame :any;
  resultAge :any;
  resultDOB :any;
  resultAddress :any;
  resultNameTH:any;
  resultSurnameTH:any;



  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    private http: Http,
    private loadingCtrl:LoadingController,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    public global: GlobalProvider,
    public httpclient:HttpClient
  ) {
  }

  async takePhoto() {
    try {
      const options: CameraOptions = {
        quality: 70,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      };

      const result = await this.camera.getPicture(options);

      this.image = `data:image/jpeg;base64,${result}`;
      this.b64IDcard = this.image ;

      if(this.image !== null ){
        this.statusCheck = true;
        this.statusNext = true;
      }

    } catch (e) {
      console.error(e);
    }
  }

  async getPhoto() {
    const options: CameraOptions = {
      quality: 70,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    const result = await this.camera.getPicture(options);
    this.image = `data:image/jpeg;base64,${result}`;
    this.b64IDcard =  `${result}`;

    if(this.image !== null ){
      this.statusCheck = true;
      this.statusNext = true;
    }

  }

  fetchResult() {
    this.result = null;

    var postBody = {
      base64image: this.b64IDcard
    }

    let headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });

    let options = new RequestOptions({ headers: headers });

    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();

    this.http.post('check id card validity path', postBody, options)
    .subscribe(response => {

      loader.dismiss();

      console.log(response.text());

      this.result = response.text();

      this.resultJson = JSON.parse(this.result);

      console.log(this.resultJson);

      this.resultID = this.resultJson.id;
      this.resultGender = this.resultJson.gender;
      this.resultName = this.resultJson.name;
      this.resultLastname = this.resultJson.lastname;
      this.resultThainame = this.resultJson.nameSurnameTH;
      this.resultAge = this.resultJson.age;
      this.resultDOB = this.resultJson.dob;
      this.resultAddress = this.resultJson.addressTH;
      this.resultNameTH = this.resultJson.nameTH;
      this.resultSurnameTH = this.resultJson.surnameTH;

      this.global.id = this.resultID;
      this.global.name = this.resultName;
      this.global.surname = this.resultLastname;
      this.global.namesurnamethai = this.resultThainame;
      this.global.age = this.resultAge;
      this.global.dob = this.resultDOB;
      this.global.address = this.resultAddress;
      this.global.gender = this.resultGender;
      this.global.nameTH = this.resultNameTH;
      this.global.surnameTH = this.resultSurnameTH;


      
    }, (err) => {
      console.log(err);
      alert("Error");
      loader.dismiss();
    });
  }

  nextPage() {
    this.navCtrl.push(IdcardformPage);
  }

}
