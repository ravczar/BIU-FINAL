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
  peopleBest: Person[] = [];
  peopleWorst: Person[] = [];

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.getBestPlayers();
    this.getWorstPlayers();
  }

  getPeople(): void {
    this.personService.getPeople()
      .subscribe(people => this.people = people.slice(0, 5));
  }

  getBestPlayers(): void {
    this.personService.getPersonWithSortedScores("ASC")
      .subscribe(people => this.peopleBest = people.slice(0, 5));
  }

  getWorstPlayers(): void {
    this.personService.getPersonWithSortedScores("DESC")
      .subscribe(people => this.peopleWorst = people.slice(0, 5));
  }

}
