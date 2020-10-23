import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Key } from 'protractor';
import { User } from '../models/user';
import { UserService } from '../services/user/user.service';
import { debounceTime } from 'rxjs/operators'; 
import { UIAlertService } from '../UITools/uialert.service';
import { Router } from '@angular/router';


function validaPassword(control : AbstractControl):{[Key:string]: boolean}|null {
  let _passControl = control.get('passControl').value;
  let _othePassControl = control.get('otherPassControl').value;
  if (_passControl === _othePassControl) {
    return null;
  }
  return { 'match': true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registroForm : FormGroup;
  newUser : User;
  errorMessage: string;

  get errorControl(){
    return this.registroForm.controls;
  }


  constructor(private userService : UserService, 
              private fb : FormBuilder,
              private alert : UIAlertService,
              private router : Router) { }

  ngOnInit() {
    this.registroForm = this.fb.group({
      emailControl : ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      passwordGroup : this.fb.group({
        passControl : ['', Validators.required],
        otherPassControl : ['', Validators.required]
      }),
      terminosControl : true
    });

    const _terminosControl = this.registroForm.get('terminosControl');


  }

  saveUser(){
    const _passwordGroup = this.registroForm.get('passwordGroup');

    this.newUser = {
      idUsuario : null,
      strPassword : _passwordGroup.get('passControl').value,
      strUsuario : this.registroForm.get('emailControl').value,
      intNumIntentos : 0,
      bitActivo: 1,
      intTipoUsuario : 2
    }

    const result = validaPassword(_passwordGroup);
    if(result !== null){
      this.alert.putMsgError( 'La confirmación del password no concuerda con la ingresada');
      return;
    }
    if(!this.errorControl.terminosControl.value){
      this.alert.putMsgError( 'Debes leer y aceptar los terminos y condiciones para continuar');
      return;
    }
  

    this.userService.newUser(this.newUser).subscribe(data => {
      if(!data['succes']){
        this.alert.putMsgError( data['response'] );
      return;  
      }
    },
    err => {
      this.alert.putMsgError( err.response);
      return;
    },
    () => {
      this.alert.putMsgInfo('El usuario se creo con exito!');
      this.router.navigate(['home']);
    });

  }

}
