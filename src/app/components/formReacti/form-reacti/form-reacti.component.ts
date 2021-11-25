import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.interface';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-form-reacti',
  templateUrl: './form-reacti.component.html',
  styleUrls: ['./form-reacti.component.scss']
})
export class FormReactiComponent implements OnInit {

  public usuario: User;
  public reactiveForm: any;
  public usuarios: User[] = [];


  constructor(private fb: FormBuilder, private userService: UserServiceService) {
    this.usuario = new User('', '', 0 , '');
    this.reactiveForm = this.fb.group({
      name: ['', [Validators.required,  Validators.maxLength(100)]],
      surname: ['', [Validators.required,  Validators.maxLength(100)]],
      age: ['', [Validators.required, Validators.min(1),Validators.max(100)]],
      dni: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), this.validatorDNI]]
    });
   }

  ngOnInit(): void {
    this.usuarios = this.userService.getUser();
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
      this.usuarios = this.userService.getUser();
    } else {
      console.log('No valido');

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

  get name() {return this.reactiveForm.get('name');}
  get surname() {return this.reactiveForm.get('surname');}
  get dni() {return this.reactiveForm.get('dni');}
  get age() {return this.reactiveForm.get('age');}

}
