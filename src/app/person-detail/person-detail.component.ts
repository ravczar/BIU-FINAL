import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Person }         from '../data/person';
import { PersonService }  from '../services/person.service';
import { MessageService } from '../services/message.service'

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: [ './person-detail.component.css' ]
})
export class PersonDetailComponent implements OnInit {
  person: Person;

  private isInEditMode: boolean = false;
  private buttonString: string ="Edit details";

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private location: Location,
    private messageService: MessageService // This must be inserted in constructor in order to use Singletone : MessageService
  ) {}

  ngOnInit(): void {
    this.getPerson();
  }

  private getPerson(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.personService.getPerson(id)
      .subscribe(person => this.person = person);
  }

  private goBack(): void {
    this.location.back();
    this.messageService.add('Person-Detail: Leaving Person-detail view after pressing @back button');
  }

  private toggleEditMode():void {
    let edit: string = "Edit details";
    let save: string = "Save details";
    this.isInEditMode = !this.isInEditMode;
    if (this.isInEditMode){
      this.buttonString = save;
      this.messageService.add('Person-Detail: Entered user-detail edit Mode');
    }
    else if (!this.isInEditMode){
      this.buttonString = edit; 
      this.messageService.add('Person-Detail: Saved details of User');
    }
  }
}
