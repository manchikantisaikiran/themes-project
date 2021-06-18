import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isLoggedIn = '';
  constructor(private router:Router,
    private loginService:LoginService) {
    this.loginService.isLoggedIn.subscribe((data)=>{
      console.log(data)
      if(data === ''){
        this.router.navigate([''])
      }
      this.isLoggedIn = data;
    })
  }

  ngOnInit(): void {
  }

}
