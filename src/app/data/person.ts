export class Person {

  constructor(id:number, name:string, surname:string, email:string, phone: string, 
    username: string, password: string, previousPassword: string, pet: string, 
    adress: {city: string,street: string, building: string, flat: string}, 
    newsletter: boolean ){ this.score[0] = 0; this.time[0] = 0;}
    
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
  }
  