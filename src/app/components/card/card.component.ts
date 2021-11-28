import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user.interface';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() user!: User;
  @Input() index!: number;
  public selected: boolean = false;
  @Output() userSelect = new EventEmitter<User>();

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    this.userService.estado$.subscribe(
      (card) => {
        if (this.user === card) {
          this.selected = false;
        } else {
          this.selected = true;
        }
      }
    )
  }

  selectCard() {
    this.userSelect.emit(this.user);
  }

  deleteItem() {
    this.userService.deleteUser(this.user);
  }

}
