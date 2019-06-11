import { Component, OnInit } from '@angular/core';
import { Person } from '../data/person';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: [ './navigation.component.css' ]
})
export class NavigationComponent implements OnInit {
  people: Person[] = [];

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.getPeople();
  }

  getPeople(): void {
    this.personService.getPeople()
      .subscribe(people => this.people = people.slice(1, 5));
  }
}
