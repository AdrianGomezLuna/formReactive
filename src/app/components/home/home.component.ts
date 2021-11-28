import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.interface';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public usuario: User;
  public users: User[] = [];
  public reactiveForm: any;
  public selectEdad: number = 0;
  public index: number = 0;

  constructor(private userService: UserServiceService, public fb: FormBuilder) {
      this.users = this.userService.getUser();
      this.usuario = new User('', '', 0 , '');
      this.reactiveForm = this.fb.group({
        name: ['', [Validators.required,  Validators.maxLength(100)]],
        surname: ['', [Validators.required,  Validators.maxLength(100)]],
        age: ['', [Validators.required, Validators.min(1),Validators.max(100)]],
        dni: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), this.validatorDNI]]
      });
      this.selectEdad = 0;
  }

  ngOnInit(): void {

  }



  onSubmit() {
    console.log(this.reactiveForm);

    if (this.reactiveForm.status === 'VALID') {
      console.log('valido');
      this.usuario.name = this.reactiveForm.get('name').value;
      this.usuario.surname = this.reactiveForm.get('surname').value;
      this.usuario.age = this.reactiveForm.get('age').value;
      this.usuario.dni = this.reactiveForm.get('dni').value;

      this.userService.addUser(this.usuario);
      this.users = this.userService.getUser();
      this.usuario = new User('', '', 0 , '');
      this.reset();
    } else {
      console.log('No valido');
    }
  }

  onSubmit2(){

    for (let index = 0; index < this.users.length; index++) {
      if (this.users[index].age === this.selectEdad) {
        this.users[index].selected = true;
      } else {
        this.users[index].selected = false;
      }

    }
  }

  public validatorDNI(control: AbstractControl):{[key: string]: any} | null {
		let validDNI: string = control.value;
    let numero: number;
    let letra: string;

    const expresion: RegExp = /\d{1,8}[A-Z]$/;
    const validacionLetra: string = 'TRWAGMYFPDXBNJZSQVHLCKET';

    validDNI = validDNI.toUpperCase();

    if (expresion.test(validDNI)) {
        numero = parseInt(validDNI.substr(0,validDNI.length-1));
        letra = validDNI.substr(validDNI.length-1, validDNI.length);

        numero = numero % 23;
        let letraDNI = validacionLetra.substring(numero, numero+1);

        if (letra != letraDNI) {
            return {validDNI: {value: control.value}};
        }else{
            return null;  //DNI Correcto
        }
    } else {
      return {validDNI: {value: control.value}};
    }
  }

  reset() {
    this.reactiveForm.controls.name.value = '';
    // document.querySelector("#name")?.nodeValue.;
    // this.reactiveForm.surname.value = '';
    // this.reactiveForm.dni.value = '';
    // this.reactiveForm.age.value = '';
    console.log(this.reactiveForm.controls.name.value);
  }

  get name() {return this.reactiveForm.get('name');}
  get surname() {return this.reactiveForm.get('surname');}
  get dni() {return this.reactiveForm.get('dni');}
  get age() {return this.reactiveForm.get('age');}
}
