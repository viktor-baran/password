import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  passwordToCheck: string = ''
  
  passwordStrength: number = 0

  bar0: string = 'lightgray'
  bar1: string = 'lightgray'
  bar2: string = 'lightgray'

  private colors = ['lightgray', 'red', 'orange', 'green'];

  message: string = ''
  messageColor: string = ''

  onChanges(): void {
    console.log('onChanges')

    const password = this.passwordToCheck

    this.setBarColors(3, 'lightgray');

    if (password && password.length < 8) {
      this.setBarColors(3, 'red');

      this.message = 'Less than 8 characters'

      this.messageColor = 'red';
    }
    else if (password) {
      const pwdStrength = this.checkStrength(password);

      const color = {
        strength: pwdStrength,
        color: this.colors[pwdStrength]
      }

      this.setBarColors(color.strength, color.color);

      this.messageColor = this.colors[pwdStrength];

      switch (pwdStrength) {
        case 0:
          this.message = 'Poor';
          break;
        case 1:
          this.message = 'Easy ';
          break;
        case 2:
          this.message = 'Medium';
          break;
        case 3:
          this.message = 'Strong';
          break;
      }
    } else {
      this.message = '';
    }
    
  }

  private checkStrength(password: string) {
    let strength = 0;

    const letters = /[a-zA-Z]+/.test(password);
    const numbers = /[0-9]+/.test(password);
    const symbols = /[$-/:-?{-~!"^_@`\[\]]/g.test(password);

    const flags = [letters, numbers, symbols];

    for (const flag of flags) {
      strength += (flag === true) ? 1 : 0;
    }

    return strength;
  }

  private setBarColors(count: number, color: string) {
    for (let n = 0; n < count; n++) {
      (this as any)['bar' + n] = color;
    }
  }
}
