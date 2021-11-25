import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private users: User[] = []
  // private estado = new Subject<any>();
	// public  estado$ = this.estado.asObservable();

  constructor() { }

  public getUser() {
    return this.users;
  }

  public addUser(user: User) {
    this.users.push(user);
  }

  public selectUser(user: string){
    // this.estado.next(user);
  }
}
