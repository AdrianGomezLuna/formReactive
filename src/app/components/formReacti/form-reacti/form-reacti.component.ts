import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  public usuarios: User[] = []

  constructor(private fb: FormBuilder, private userService: UserServiceService) {
    this.usuario = { name: '', surname: '', age: 0, dni: '' };
    this.reactiveForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      surname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      age: ['', [Validators.required]],
      dni: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
    this.usuarios = this.userService.getUser();
  }

  onSubmit() {
    console.log(this.reactiveForm);

    this.usuario = {
      name: this.reactiveForm.get('name').value,
      surname: this.reactiveForm.get('surname').value,
      age: this.reactiveForm.get('age').value,
      dni: this.reactiveForm.get('dni').value
    };

    this.userService.addUser(this.usuario);
    this.usuarios = this.userService.getUser();

    console.log('usuario',this.usuario);

  }


}
