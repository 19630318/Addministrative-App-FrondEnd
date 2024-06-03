import { Component, Inject, inject } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { faArrowDown, faArrowLeft, faArrowRight, faMoon, faSun, faBell  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { Data } from '../../../../models/date-response.models';
import { Router } from '@angular/router';
import { ThemeService } from '../../../../services/theme.service';
import { NavegationService } from '../../../../services/navegation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [OverlayModule, CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  private authService = inject(AuthService);
  private router = inject(Router);  
  private themeService = inject(ThemeService);
  private navegationService = inject(NavegationService);

  user$ = this.authService.user$
  themeChange = false;
  menuItems$ = this.navegationService.menuItemBussines$

  ngOnInit() {
    console.log(this.user$);
    this.themeService.getTheme().subscribe({
      next: theme => {
        console.log('theme', theme);
        if(theme === 'true'){
          this.themeChange = true;
        }else{
          this.themeChange = false;
        }
      },
      error: error => console.error(error)
    });

  }

  isOpenOverlayAvatar = false;
  isOpenMenuSmall = false;
  isOpenNotification = false;
  faArrowDown = faArrowDown;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faMoon = faMoon;
  faSun = faSun;
  faBell = faBell;

  logout(){
    this.authService.logOut();
    console.log('cerro sesion');
    this.router.navigate(['/login']);
  }

  changeTheme(){
    this.themeService.updateTheme();
  }

  changeItemBoolean(name: string){
    console.log(name);
    this.navegationService.menuItemBussines$.subscribe((data) => {
      console.log('Entro al change Item',data);
      if (data) {
        data.forEach((item) => {
          if(item.name === name){
            item.dropdown = !item.dropdown;
          }
          console.log(item);
        });
      }
    });
  }
  

}
