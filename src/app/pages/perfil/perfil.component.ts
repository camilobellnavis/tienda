import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Cliente } from '../../model';
import { FirestorageService } from '../../services/firestorage.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { FirestoreService } from '../../services/firestore.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  cliente: Cliente={
    uid: '',
    email: '',
    pass: '',
    nombre: '',
    celular: '',
    foto: '',
    referencia: '',
    ubicacion: null,
  };
  uid ='';
  suscribeUserinfo: Subscription;

  constructor(public menucontroler: MenuController,
    public firestorageService: FirestorageService,
    public firebaseauthService: FirebaseauthService,
    public firestoreService: FirestoreService) {

      this.firebaseauthService.stateAuth().subscribe(res =>{
        if(res !== null){
          this.uid= res.uid;
          this.getinfoUser(this.uid);
        }else{
         this.initCLiente();
        }
      });
    }

  async ngOnInit() {
    const uid = await this.firebaseauthService.getUid();
    console.log(uid);
  }

  async salir(){
    //const uid = await this.firebaseauthService.getUid();
    //console.log(uid);
    this.firebaseauthService.logout();
    this.suscribeUserinfo.unsubscribe();
  }
  initCLiente(){
    this.uid='';
    this.cliente={
      uid: '',
      email: '',
      pass: '',
      nombre: '',
      celular: '',
      foto: '',
      referencia: '',
      ubicacion: null,
    };
  }
    getinfoUser(uid: string){
      const path = 'Clientes';
      this.suscribeUserinfo = this.firestoreService.getDoc<Cliente>(path,uid).subscribe(res=>{
        this.cliente = res;
      });
   }

}
