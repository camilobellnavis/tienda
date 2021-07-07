import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../model';
import { FirestorageService } from '../../services/firestorage.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { FirestoreService } from '../../services/firestore.service';
import { Subscription } from 'rxjs';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-infocuenta',
  templateUrl: './infocuenta.component.html',
  styleUrls: ['./infocuenta.component.scss'],
})
export class InfocuentaComponent implements OnInit {



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
  newFile: any;
  uid ='';
  suscribeUserinfo: Subscription;
  ingresarEnable= false;

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

  openMenu(){
    this.menucontroler.toggle('menu');
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

  async newImageUpload(event: any){
    if(event.target.files && event.target.files[0]){
        this.newFile = event.target.files[0];
         const reader = new FileReader();
         reader.onload = ((image) =>{
         this.cliente.foto= image.target.result as string;
       });
         reader.readAsDataURL(event.target.files[0]);
       }
   }
   async registrarse(){
     const credenciales = {
       email: this.cliente.email,
       pass: this.cliente.pass,
     };
     const res = await this.firebaseauthService.registrar(credenciales.email,credenciales.pass);
     const uid = await this.firebaseauthService.getUid();
     this.cliente.uid = uid;
     this.guardarUser();
     //console.log(uid);
   }

   async guardarUser(){
    const path = 'Clientes';
    const name = this.cliente.nombre;
    if(this.newFile !== undefined){
      const resp = await this.firestorageService.uploadImg(this.newFile,path,name);
      this.cliente.foto= resp;
    }

    this.firestoreService.createDoc(this.cliente,path,this.cliente.uid).then(res =>{
      console.log('Se guardo Exitosamente');
    }).catch(error =>{
      console.log('NO Se guardo Exitosamente');
    });
  }

   async salir(){
     //const uid = await this.firebaseauthService.getUid();
     //console.log(uid);
     this.firebaseauthService.logout();
     this.suscribeUserinfo.unsubscribe();
   }

   getinfoUser(uid: string){
    const path = 'Clientes';
    this.suscribeUserinfo = this.firestoreService.getDoc<Cliente>(path,uid).subscribe(res=>{
      this.cliente = res;
    });
   }

   async ingresar(){
    const credenciales = {
      email: this.cliente.email,
      pass: this.cliente.pass,
    };
    const res = await this.firebaseauthService.login(credenciales.email,credenciales.pass);
   }

}
