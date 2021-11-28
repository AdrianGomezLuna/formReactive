import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private users: User[] = []
  private estado = new Subject<any>();
	public estado$ = this.estado.asObservable();

  constructor() { }

  public getUser() {
    return this.users;
  }

  public addUser(user: User) {
    this.users.push(user);
  }

  public selectUser(edad: number){
    this.estado.next(edad);
  }

  public deleteUser(user: User){
    const encontrado = this.users.indexOf(user);
    this.users.splice( encontrado , 1);
  }
}
