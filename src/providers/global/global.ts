import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalProvider {

  constructor(public http: HttpClient) {
  }

  public b64Source: any;


//check similarity
  public similarity: any;

  public facesnull:any;

  //check ID
  public IDvalid:any;

  public sourceImage:any;
  public targetImage:any;

  //ID inform
  public id:any;
  public name:any;
  public surname:any;
  public namesurnamethai:any;
  public dob:any;
  public age:any;
  public gender:any;
  public address:any;
  public nameTH:any;
  public surnameTH:any;
}
