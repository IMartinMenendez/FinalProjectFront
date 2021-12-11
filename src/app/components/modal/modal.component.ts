import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public static message: string = "";
  public static isDelete: boolean = false;
  public static onClick: () => void = () => {
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  onClick() {
    ModalComponent.onClick();
  }

  get message() {
    return ModalComponent.message;
  }

  get isDelete() {
    return ModalComponent.isDelete;
  }
}
