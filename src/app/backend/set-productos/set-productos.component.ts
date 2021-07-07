import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
import { Producto } from '../../model';
import { rendererTypeName } from '@angular/compiler';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirestorageService } from '../../services/firestorage.service';

@Component({
  selector: 'app-set-productos',
  templateUrl: './set-productos.component.html',
  styleUrls: ['./set-productos.component.scss'],
})
export class SetProductosComponent implements OnInit {
  productos: Producto[];

  newProducto: Producto;
  loading: any;
  newImage = '';
  newFile ='';

  enablenewProducto = false;

  private path = 'Productos/';

  constructor(public menucontroler: MenuController,
              public firestoreService: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public fireStorage: AngularFireStorage,
              public firestorageService: FirestorageService) { }

  ngOnInit() {
    this.getProductos();
  }

  openMenu(){
    this.menucontroler.toggle('menu');
  }

  async guardarProducto(){
    this.presentLoading();
    const path = 'Productos';
    const name = this.newProducto.nombre;
    const resp = await this.firestorageService.uploadImg(this.newFile,path,name);
    this.newProducto.foto= resp;

    this.firestoreService.createDoc(this.newProducto,this.path,this.newProducto.id).then(res =>{
      this.loading.dismiss();
      this.presentToast('Guardado con Éxito');
    }).catch(error =>{
      this.presentToast('Error inesperado');
    });
  }

  async eliminarProducto(item: Producto){

      const alert = await this.alertController.create({
        cssClass: 'normal',
        header: 'Seguro!',
        message: 'Desea  <strong>eliminar</strong> este producto?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'primary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Eliminar',
            cssClass: 'btn-dlt',
            handler: () => {
              console.log('Confirm Okay');
              this.firestoreService.deleteDoc(this.path,item.id).then(res =>{
                this.alertController.dismiss();
                this.presentToast('Eliminado con Éxito');
              }).catch(error =>{
                this.presentToast('Error inesperado');
              });
            }
          }
        ]
      });
      await alert.present();

  }

  getProductos(){
    this.firestoreService.getCollection<Producto>(this.path).subscribe(res => {
      console.log(res);
      this.productos= res;
    });
  }

  nuevoProducto(){
    this.enablenewProducto=true;
    this.newProducto = {
      nombre: '',
      precioNormal: null,
      precioReducido: null,
      foto: '',
      id: this.firestoreService.getId(),
      fecha: new Date()
    };
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'Guardando...',
    });
    await this.loading.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: 'normal',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  async newImageUpload(event: any){
   if(event.target.files && event.target.files[0]){
       this.newFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = ((image) =>{
        this.newProducto.foto= image.target.result as string;
      });
        reader.readAsDataURL(event.target.files[0]);
      }
  }

}
