import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  theme$ = new BehaviorSubject<string>('false');

  constructor() {
    const initialTheme = getCookie('theme');
    this.theme$.next(initialTheme!);
   }

  getTheme(): BehaviorSubject<string>{
    return this.theme$;
  }

  updateTheme(){
    const currentTheme = this.theme$.getValue();
    const newTheme = currentTheme === 'false' ? 'true' : 'false';
    setCookie('theme', newTheme);
    this.theme$.next(newTheme);
  }



}
