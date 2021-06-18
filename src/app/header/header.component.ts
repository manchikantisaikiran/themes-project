import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { LoginService } from '../services/login.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  activeFragment: Observable<string>;
  themeSection = false;
  activeThemeMode = 'light';
  activeTheme = 'default';
  headerScrollClass!: any;
  isLoggedIn = '';
  constructor(private route: ActivatedRoute,
    private router:Router,
    private loginService:LoginService) {
    this.activeFragment = this.route.fragment.pipe(share());
    //subscribe login succesful or not
    this.loginService.isLoggedIn.subscribe((data)=>{
      console.log(data)
      if(data === ''){
        this.router.navigate([''])
      }
      this.isLoggedIn = data;
    })
  }

  onLogout(){
    this.isLoggedIn = '';
    // this.router.navigate(['']);
  }

  ngOnInit(): void {
  }

  // for window scroll events
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.headerScrollClass = {
      'scroll-header': window.pageYOffset > 80 ? true : false
    }
  }

  sectionThemeClass = {
    'show': this.themeSection
  }

  sectionOverlayClass = {
    'show__overlay': this.themeSection
  }

  activeThemeClass = {
    'active-mode': this.activeThemeMode
  }

  toggleTheme() {
    this.themeSection = !this.themeSection;
    this.sectionThemeClass['show'] = this.themeSection;
    this.sectionOverlayClass['show__overlay'] = this.themeSection;
  }

  changeThemeMode(theme: string) {
    console.log(theme)
    this.activeThemeMode = theme;
    const body = document.querySelector('body');
    body?.setAttribute('mode', `${this.activeThemeMode}`);
    body?.setAttribute('theme', `${this.activeTheme}`);
  }

  changeTheme(theme: string) {
    console.log(theme)
    this.activeTheme = theme;
    this.changeThemeMode(this.activeThemeMode);
  }
}
