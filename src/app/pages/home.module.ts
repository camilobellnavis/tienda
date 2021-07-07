import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PrincipalComponent } from './principal/principal.component';
import { RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { InfocuentaComponent } from './infocuenta/infocuenta.component';
import { ComponentesModule } from '../componentes/componentes.module';


@NgModule({
  declarations: [PrincipalComponent,PerfilComponent,InfocuentaComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ComponentesModule
  ]
})
export class HomePageModule {}
