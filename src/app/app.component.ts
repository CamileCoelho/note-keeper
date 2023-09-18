import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  text: string = 'Digite algo...';

  mostrarText() {
    alert(this.text);
  }
}