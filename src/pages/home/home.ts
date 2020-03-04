import { Component } from "@angular/core";
import { NavController,NavParams } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { UploadimagePage } from "../uploadimage/uploadimage";
import { GlobalProvider } from "../../providers/global/global";


@Component({
  selector: "page-home",
  templateUrl: "home.html"
})

export class HomePage {
  public image: any;
  public indexData: any;
  public b64Source: any;
  public indexResult:any;
  public status:any = false;

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    public navParams: NavParams,
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
      this.b64Source = `${result}` ;

      this.global.b64Source = this.b64Source;
      this.global.sourceImage = this.image;

      if(this.image !== null ){
        this.status = true;
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
    this.b64Source = `${result}`;

    //collect data to global 
    this.global.b64Source = this.b64Source;
    this.global.sourceImage = this.image;

    if(this.image !== null ){
      this.status = true;
    }

  }

  nextPage() {
    this.navCtrl.push(UploadimagePage);
  }


}

