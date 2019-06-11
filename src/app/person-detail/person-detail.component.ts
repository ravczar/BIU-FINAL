import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Person }         from '../data/person';
import { PersonService }  from '../services/person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: [ './person-detail.component.css' ]
})
export class PersonDetailComponent implements OnInit {
  person: Person;

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPerson();
  }

  getPerson(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.personService.getPerson(id)
      .subscribe(person => this.person = person);
  }

  goBack(): void {
    this.location.back();
  }
}