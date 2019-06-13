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
    PEOPLE.sort((x, y) => x.id - y.id );
    return of(PEOPLE);
  }

  getPerson(id: number): Observable<Person> {
    this.messageService.add(`PersonService: fetched certain PERSON id=${id}`); // Send message to message.service
    return of(PEOPLE.find(person => person.id === id));
  }

  getPersonByUsername(username: string): Observable<Person> {
    this.messageService.add(`PersonService: Just checking if username=${username}. already exist in Players DataBase`); // Send message to message.service
    return of(PEOPLE.find(person => person.username === username));
  }

  getPersonWithSortedScores ( order :string ) : Observable<Person[]> {
    //filtruje PEOPLE i zwraca pofiltrowaną. Z tego potem wytniemy górne wyniki (t0p 5) //https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
    if(order =="DESC"){
      this.messageService.add(`PersonService: fetching sorted DESC list of PPL.`); // Send message to message.service
      PEOPLE.sort((x, y) => x.score[0] - y.score[0] );
    }
    else if( order == "ASC"){
      this.messageService.add(`PersonService: fetching sorted ASC list of PPL.`); // Send message to message.service
      PEOPLE.sort((x, y) => y.score[0] - x.score[0] );
    }
    return of(PEOPLE);
  }

  setPerson(persona: Person):void{
    PEOPLE.push(persona);
    this.messageService.add(`PersonService: Successfully added new PERSON username=${persona.username}`);
  }


}

let groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

