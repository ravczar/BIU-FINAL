import { Input, Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  title = 'Welcome to my BIU Final';
  someclass= 'active';


  private buttons = {
   btnRegister : 'link',
   btnTop : 'active',
   btnPeople : 'link',
   btnMessages :'link',
   btnStopwatch: 'link'
  };

  clearAllToLinkClass (){
    this.buttons.btnMessages = 'link';
    this.buttons.btnPeople = 'link';
    this.buttons.btnRegister = 'link';
    this.buttons.btnTop = 'link';
    this.buttons.btnStopwatch = 'link';
  }

  addClassActiveOrRemove(name:string){
    let number: Number;
    if(name === 'btnRegister') number = 0;
    else if(name === 'btnTop') number = 1; 
    else if(name === 'btnPeople') number = 2; 
    else if(name === 'btnMessages') number = 3; 
    else if(name === 'btnStopwatch') number = 4; 

    if(this.buttons[`${name}`] == 'link'){
      this.clearAllToLinkClass ();
      this.buttons[`${name}`] = 'active';
    }
    else if( this.buttons[`${name}`] == 'active')
      this.buttons[`${name}`] = 'link'
    //console.log("IMIE ELEMENTU: "+ name);
    //console.log("WYBIERAMY: " + this.buttons[`${name}`]);
  }



}
