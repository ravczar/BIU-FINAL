import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core'; // służy do pobierania informacji z komponentu - parent'a

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Quiz BIU';

  private buttons = {
   btnRegister : 'active',
   btnTop : 'link',
   btnPeople : 'link',
   btnMessages :'link',
  }

  addClassActiveOrRemove(name:string){
    console.log("IMIE ELEMENTU: "+ name);
  }



}
