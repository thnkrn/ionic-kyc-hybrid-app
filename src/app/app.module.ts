import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UploadimagePage } from '../pages/uploadimage/uploadimage';
import { ResultPage } from '../pages/result/result';
import { IdcardformPage } from '../pages/idcardform/idcardform';
import { ResultfailPage } from '../pages/resultfail/resultfail';
import { CustomNavBarPage } from '../pages/custom-nav-bar/custom-nav-bar';
import { UploadidcardPage } from '../pages/uploadidcard/uploadidcard';

import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { GlobalProvider } from '../providers/global/global';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UploadimagePage,
    ResultPage,
    IdcardformPage,
    ResultfailPage,
    CustomNavBarPage,
    UploadidcardPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: ''
    }),
    IonicStorageModule.forRoot(),
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UploadimagePage,
    ResultPage,
    IdcardformPage,
    ResultfailPage,
    CustomNavBarPage,
    UploadidcardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    FileTransfer,
    File,
    GlobalProvider
  ]
})
export class AppModule {}
