import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Person } from '../data/person';
import { PEOPLE } from '../data/mock-people';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })

export class PersonService {

  constructor(private messageService: MessageService) { }

  getPeople(): Observable<Person[]> {
    // TODO: send the message _after_ fetching the PEOPLE
    this.messageService.add('PersonService: fetched all PEOPLE');
    return of(PEOPLE);
  }

  getPerson(id: number): Observable<Person> {
    // TODO: send the message _after_ fetching the PERSON
    this.messageService.add(`PersonService: fetched certain PERSON id=${id}`);
    return of(PEOPLE.find(person => person.id === id));
  }
  
}
