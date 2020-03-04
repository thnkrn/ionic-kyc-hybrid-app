import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController, ActionSheetController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Http, Headers , RequestOptions  } from "@angular/http";
import { ResultPage } from "../result/result";
import { ResultfailPage } from "../resultfail/resultfail";
import { HttpHeaders,HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@IonicPage()
@Component({
  selector: 'page-idcardform',
  templateUrl: 'idcardform.html',
})
export class IdcardformPage {

  userform:FormGroup;

  public userData: any;
  public userDataString:any;
  public userJson: any;
  public birthDate: any;
  public birthDateJson: any;
  public datePreYear:any;
  public dateMonth:any;
  public dateDay:any;
  public dateIntYear:any;
  public dateYear:any;
  public userDataJson:any;
  public responseData:any;
  public responseJson:any;
  public validData:any;
  public valid:any;
  public statusNext:any = false;
  defaultIDNo:string;
  defaultName:string;
  defaultSurname:string;
  defaultLaserID:string;

  idnumber:AbstractControl;
  firstname:AbstractControl;
  middlename:AbstractControl;
  lastname:AbstractControl;
  laserID:AbstractControl;

  constructor(

    public navCtrl: NavController,
     public navParams: NavParams,
     private http: Http,
    public formbuilder:FormBuilder,
    public global: GlobalProvider,
    private loadingCtrl:LoadingController,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    public httpclient:HttpClient
  ) {

    this.createForm();

    this.defaultIDNo = this.global.id;
    this.defaultName = this.global.nameTH;
    this.defaultSurname = this.global.surnameTH;
    this.defaultLaserID = "JC1058813930";
}
   createForm(){
     this.userform = this.formbuilder.group ({

      idnumber: ['', [Validators.required, Validators.maxLength(13)]],
      firstname: ['', [Validators.required, Validators.maxLength(30)]],
      middlename:[''] ,
      lastname: ['', [Validators.required, Validators.maxLength(30)]], 
      laserID:['',[Validators.required, Validators.maxLength(12)]]

     });

     this.idnumber = this.userform.controls['idnumber'];
     this.firstname = this.userform.controls['firstname'];
     this.middlename = this.userform.controls['middlename'];
     this.lastname = this.userform.controls['lastname'];
     this.laserID = this.userform.controls['laserID'];

   }
   
  /*
  
   getBirthDate(){

    this.datePreYear = this.birthDate.substring(0,4);

    this.dateMonth = this.birthDate.substring(5,7);

    this.dateDay = this.birthDate.substring(8,10);

    this.dateIntYear = parseInt(this.datePreYear) + 543 ;
    

    this.dateYear = this.dateIntYear.toString();

   }

   */

  createAuthorizationHeader() {
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json");

    return headers
  }

  
   createUserDataJson(){
     
    this.userData = this.userform.value;

    this.datePreYear = this.birthDate.substring(0,4);

    this.dateMonth = this.birthDate.substring(5,7);

    this.dateDay = this.birthDate.substring(8,10);

    this.dateIntYear = parseInt(this.datePreYear) + 543 ;
    
    this.dateYear = this.dateIntYear.toString();

      this.userDataJson = {
       nid : this.userData.idnumber,
       first_name : this.userData.firstname,
       middle_name : this.userData.middlename,
       last_name : this.userData.lastname,
       birth_date : this.dateYear + this.dateMonth + this.dateDay,
       laser_id : this.userData.laserID
     }

     
     console.log(this.userDataJson);

    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();

    let headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });

     let options = new RequestOptions({ headers: headers });

     this.http.post("ocr path" , JSON.stringify(this.userDataJson) , options)
     .subscribe(response => {

      loader.dismiss();

      console.log(response.text());

      this.responseData = response.text();
      this.responseJson = JSON.parse(this.responseData);
      this.validData = this.responseJson.desc;
      // this.valid = JSON.stringify(this.validData);
      this.valid = this.validData;

      this.global.IDvalid = this.valid;

      if(this.responseData !== null ){
        this.statusNext = true;
      }

      console.log(this.valid);
      console.log(this.global.IDvalid);
   }, (err) => {
    console.log(err);
    alert("Error");
    loader.dismiss();
  });
   
   }

   nextPage() {

    this.navCtrl.push(ResultPage);
  }

  /*
   nextPage() {

    if((this.responseData !== null) && this.global.similarity !==null){
    this.navCtrl.push(ResultPage);
    } else {
      this.navCtrl.push(ResultfailPage);
    }
  }
  */
  }



