import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from "@angular/forms";
import { debounceTime } from 'rxjs/operators';
import { MessageService } from '../services/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonService } from '../services/person.service';

function passwordMatcher(c: AbstractControl):{[key:string]:boolean}|null{   
  let passwordControl = c.get('password');   
  let confirmPasswordControl = c.get('cPassword');   
  if(passwordControl.pristine || confirmPasswordControl.pristine)     
    return null;
  if(passwordControl.value === confirmPasswordControl.value)     
    return null;   
  return {
    'matchPasswords':true
  }; 
} 

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  // Słownik dla matchPasswordsMsg
  passwordMessages={
    matchPasswords:"Passwords don't MATCH",     
    pattern: "Password is invalid: (1xUpperCase, 1xLowerCase, 1xNumber 1xSpecial<@ # $ %> and min 8-20 Chars)"   
  };

  matchPasswordsMsg: string;   
  passwordPatternMsg: string;

  userForm: FormGroup;
  userExists:boolean = false;
  succesfullySumbitedForm:boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService, 
    private _snackBar: MatSnackBar,
    private personService: PersonService,
    ) { }

  ngOnInit() {
    // html5pattern.com/  <- ready validators 
    this.messageService.add('User-Form: Initializing UserFormComponent');
    
    this.userForm = this.formBuilder.group({
      firstName: ['',[Validators.required, 
        Validators.pattern( '^[a-zA-Z]{2,20}$' )]], 
      lastName:  ['',[Validators.required, 
        Validators.pattern( '^[a-zA-Z]{2,50}$' )]],
      email:  ['',[Validators.required, 
        Validators.email]],
      phone:  ['',[Validators.required, //[0-9]{9} polskie numer bez spacji
        Validators.pattern('[+][(][0-9]{2}[)][0-9]{3}([-]||[]||[ ])[0-9]{3}([-]||[]||[ ])[0-9]{3}')]],
      username:  ['',[Validators.required, 
        Validators.pattern('^[A-Za-z0-9_]{1,15}$')]],
      newsletter: ['',[Validators.required, 
        Validators.pattern('[0-1]')]],
      pswdGroup: this.formBuilder.group({         
        password:  ['',[Validators.required, 
          Validators.pattern( '((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,20})' )]],         
        cPassword:  ['',[Validators.required]]
      },{
        validator: passwordMatcher
      })
    });

    this.userForm.get('username').valueChanges.pipe(debounceTime(1000)).subscribe(value=>{
      if(value==='admin')
        this.userExists=true;
      else this.userExists=false;
    });
    
    // Logic filling  ‘passwordPatternMsg’ and ’matchPasswordsMsg’ 
    let passwordGroup = this.userForm.get("pswdGroup");     
    let password = this.userForm.get("pswdGroup.password");     
    password.valueChanges.pipe(debounceTime(500)).subscribe(value=>{       
      this.passwordPatternMsg='';         
      if((password.touched||password.dirty)&&password.getError('pattern')){           
        this.passwordPatternMsg = this.passwordMessages['pattern'];         
      }     
    });

    let confirmPassword = this.userForm.get("pswdGroup.cPassword");     
    confirmPassword.valueChanges.pipe(debounceTime(500)).subscribe(value=>{       
      this.matchPasswordsMsg='';   

    if((confirmPassword.touched||confirmPassword.dirty) && passwordGroup.getError('matchPasswords')){ 
        this.matchPasswordsMsg = this.passwordMessages['matchPasswords'];         
      }     
    });

  }

  populateTestData(){
    let passwordGroup = this.userForm.get("pswdGroup"); 
    
    this.userForm.patchValue({
      firstName: 'Rafal',
      lastName: 'Czarnecki',
      email: 'ravczar@gmail.com',
      phone: '+(48)777-111-555',
      username: 'ravczar',
      newsletter: '1'
    });
    passwordGroup.patchValue({
      password: 'Rafal89#',
      cPassword: 'Rafal89#'
    });
  }

  private viewUserDataEntered(): Array<string>{
    let inputs : Array<string> = new Array<string>();
    let inputNames : Array<string> = ['First name', 'Last name', 'Email', 'Phone No.', 'Username', 'Password', 'C Password', 'Subscribed' ];
    inputs.push(this.userForm.get("firstName").value);
    inputs.push(this.userForm.get("lastName").value);  
    inputs.push(this.userForm.get("email").value);  
    inputs.push(this.userForm.get("phone").value);  
    inputs.push(this.userForm.get("username").value);  
    inputs.push(this.userForm.get("pswdGroup.password").value);  
    inputs.push(this.userForm.get("pswdGroup.cPassword").value);
    inputs.push(this.userForm.get("newsletter").value);
    
      for (let i = 0; i < inputs.length; i++){
        console.log(inputNames[i] +" : "+ inputs[i]);
      }
    
      return inputs;
  }

  openSuccessSnackBar(message: string, action: string) {
    this._snackBar.open('User : '+ message + ', has been created! Press F12 to see your details!', action, {
      duration: 4000,
    });
  }
  openFailSnackBar(message: string, action: string) {
    this._snackBar.open('Account is not created! Try again!', action, {
      duration: 4000,
    });
  }
  setNewUserInPersonService(Id:number, Name:string, Surname:string, Email: string, Phone: string, 
    Username: string, Password: string, PreviousPassword: string, Pet: string, City: string, 
    Street: string, Building: string, Flat: string, Newsletter: boolean): void {
    
      this.personService.setPerson(Id, Name, Surname, Email, Phone, 
        Username, Password, PreviousPassword, Pet, City, 
        Street, Building, Flat, Newsletter);
  }

  onSubmit() {
    
    if(this.userForm.valid){
      let username = this.userForm.get("username").value;
      this.messageService.add('User-Form: Submited form scuccessfully');
      let allDataToBeTransferedToNewUserProfile = this.viewUserDataEntered(); //  tu są dane, zrób by zwra
      /* setNewUserInPersonService(Id:number, Name:string, Surname:string, Email: string, Phone: string, 
        Username: string, Password: string, PreviousPassword: string, Pet: string, City: string, 
        Street: string, Building: string, Flat: string, Newsletter: boolean); */
      this.openSuccessSnackBar(username, 'Close');
      this.userForm.reset();
    }
    else {
      this.messageService.add('User-Form: Form not submited - recheck fields');
      this.openFailSnackBar('SHIT HAPPENED', 'Close');
    }
}

}
