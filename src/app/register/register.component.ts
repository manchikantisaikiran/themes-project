import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router,
    private route:ActivatedRoute,
    private loginService:LoginService) { }

  ngOnInit(): void {
  }

  registerUser(e:Event){
    e.preventDefault();
    // localStorage.setItem('loggedIn','true');
    this.loginService.isLoggedIn.next('true');
    this.router.navigateByUrl('dashboard');
  }

}
