import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetProductosComponent } from './set-productos/set-productos.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [ SetProductosComponent ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    RouterModule
  ]
})
export class BackendModule { }
