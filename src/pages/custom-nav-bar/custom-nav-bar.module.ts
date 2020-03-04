import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomNavBarPage } from './custom-nav-bar';

@NgModule({
  declarations: [
    CustomNavBarPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomNavBarPage),
  ],
})
export class CustomNavBarPageModule {}
