import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController, ActionSheetController  } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {Http} from "@angular/http";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import { GlobalProvider } from "../../providers/global/global";
import { UploadidcardPage } from '../uploadidcard/uploadidcard';


@IonicPage()
@Component({
  selector: 'page-uploadimage',
  templateUrl: 'uploadimage.html',
})
export class UploadimagePage {

  public image: any;
  public data: Observable<any>;
  public b64Target: any;
  public searchData: any;
  public b64Source: any;
  public searchSimilarity: any;
  public similarityDataJson:any;
  public similarityData:any;
  public similarity:any;
  public faceMatches:any;
  public statusRek:any = false;
  public statusNext:any = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private http: Http,
    private loadingCtrl:LoadingController,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    public global: GlobalProvider
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
      this.b64Target = `${result}` ;

      this.global.targetImage = this.image;

      if(this.image !== null ){
        this.statusRek = true;
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
    this.b64Target = `${result}` ;

    this.global.targetImage = this.image;

    if(this.image !== null ){
      this.statusRek = true;
      this.statusNext = true;
    }
  }

  compareFace(){


    this.b64Source = this.global.b64Source;
    console.log(this.b64Source);
    console.log(this.b64Target);

    var searchImage = {
      SourceImage: {
        image : this.b64Source
      },
      TargetImage:{
        image : this.b64Target
      }
    }

    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();


    this.http.post("aws rekognition path", searchImage  )
    .subscribe(response => {

      loader.dismiss();

      this.searchData = response.text();

      this.similarityDataJson = JSON.parse(this.searchData);

      this.similarityData = this.similarityDataJson.FaceMatches["0"].Similarity;

      this.similarity = JSON.stringify(this.similarityData);

      this.faceMatches = this.similarityDataJson.FaceMatches;

      
     this.global.similarity = this.similarity;

     this.global.facesnull = this.faceMatches;

    }, (err) => {
      console.log(err);  
          alert("Error");
      loader.dismiss();
    });

   }

/*
  getSearchSimilarity(){

    this.similarityDataJson = JSON.parse(this.searchData);
    console.log(this.similarityDataJson);
    this.similarityData = this.similarityDataJson.FaceMatches["0"].Similarity
    console.log(this.similarityData);
    this.similarity = JSON.stringify(this.similarityData);
    console.log(this.similarity);

    this.global.similarity = this.similarity;
  }
*/

  nextPage() {
    this.navCtrl.push(UploadidcardPage);
  }

}
