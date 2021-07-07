import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
import { Producto } from '../../model';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {
  productos: Producto [] = [];
  private path = 'Productos/';
  private change: boolean;

  constructor(public menucontroler: MenuController,
              public firestoreService: FirestoreService) {

                this.loadProductos();
               }

  ngOnInit() {}

  openMenu(){
    this.menucontroler.toggle('menu');
  }

  loadProductos(){
    this.firestoreService.getCollection<Producto>(this.path).subscribe(res => {
      console.log(res);
      this.productos= res;
    });
  }
  tabChange(){
    this.change= true;
    return this.change;
  }

}
