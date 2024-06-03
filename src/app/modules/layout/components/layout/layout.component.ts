import { Component, inject, signal } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './../navbar/navbar.component';
import { TokenService } from '../../../../services/token.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { ThemeService } from '../../../../services/theme.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, NavbarComponent, CommonModule],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {

  private tokeService = inject(TokenService);
  private authService = inject(AuthService);
  private themeService = inject(ThemeService);

  themeChange = false;

  ngOnInit() {
    console.log('LayoutComponent');
    this.tokeService.getDateServer().subscribe();
    this.authService.getProfile().subscribe();
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


}
