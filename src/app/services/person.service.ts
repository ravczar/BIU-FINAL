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
  getPersonByUsername(username: string): Observable<Person> {
    this.messageService.add(`PersonService: Just checking if username=${username}. already exist in Players DataBase`); // Send message to message.service
    return of(PEOPLE.find(person => person.username === username));
  }

  // Będzie potrzebny w user-form przy dodawaniu nowego usera on Submit
  setPerson(persona: Person):void{
    PEOPLE.push(persona);
    this.messageService.add(`PersonService: Successfully added new PERSON username=${persona.username}`);
  }

}
