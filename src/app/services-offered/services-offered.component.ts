import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services-offered',
  templateUrl: './services-offered.component.html',
  styleUrls: ['./services-offered.component.scss']
})
export class ServicesOfferedComponent implements OnInit {

  showModal = -1;

  constructor() { }

  ngOnInit(): void {
  }

  openModal(index:number){
    console.log(index)
    this.showModal = index;
  }

  closeModal(index:number){
    this.showModal = -1;
  }

}
