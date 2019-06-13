export class Person {

  constructor(
    public id:number, 
    public name:string, 
    public surname:string, 
    public email:string, 
    public phone: string, 
    public username: string, 
    public password: string, 
    public previousPassword: string, 
    public pet: string, 
    public adress: {
      city: string,
      street: string, 
      building: string, 
      flat: string
    }, 
    public score: Array<number>,
    public time: Array<number>,
    public newsletter: boolean 
    ){ }

    
    /* // tak wygladala klasa na poczatku bez konstruktora :-)
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    previousPassword: string;
    pet: string;
  
    adress: {
      city: string;
      street: string;
      building: string;
      flat: string;
    }; 
  
    score: Array<number>;
    time: Array<number>;
  
    newsletter: boolean;
    */
    
  }
  