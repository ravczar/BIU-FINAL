import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Person } from '../data/person';
import { PEOPLE } from '../data/mock-people';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })

export class PersonService {

  constructor(private messageService: MessageService) { }

  getPeople(): Observable<Person[]> {
    this.messageService.add('PersonService: fetched all PEOPLE');
    return of(PEOPLE);
  }

  getPerson(id: number): Observable<Person> {
    this.messageService.add(`PersonService: fetched certain PERSON id=${id}`); // Send message to message.service
    return of(PEOPLE.find(person => person.id === id));
  }

  // Będzie potrzebne w user-forms do sprawdzani czy w bazie* jest już gość o danym username !
  getPersonByEmail(username: string): Observable<Person> {
    this.messageService.add(`PersonService: fetched certain PERSON username=${username}`); // Send message to message.service
    return of(PEOPLE.find(person => person.username === username));
  }

  // Będzie potrzebny w user-form przy dodawaniu nowego usera on Submit
  setPerson(Id:number, Name:string, Surname:string, Email: string, Phone: string, Username: string, Password: string, PreviousPassword: string, Pet: string, City: string, Street: string, Building: string, Flat: string, Newsletter: boolean):void{
    console.log("DODAJEMY NOWEGO USERA: " + Id + ", "+ Name + ", " + ", " + Surname + ", " + Email);
    let userAdress = {city: City, street: Street, building: Building, flat: Flat};
    
    let persona = new Person(
      Id, Name, Surname, Email, Phone, Username, Password, PreviousPassword, Pet, userAdress , Newsletter
    );
    
    PEOPLE.push(persona);
  }
  
}
