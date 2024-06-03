import { Component, inject } from '@angular/core';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  private tokenService = inject(TokenService);  

  deleted(){
    this.tokenService.removeToken();
  }

}
