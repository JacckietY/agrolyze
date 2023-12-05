import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{

  public logInForm: FormGroup;
  public hide: boolean = true;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.logInForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  public register() {
    this.router.navigateByUrl('register');
  }

  public logIn() {
    const userData = Object.assign(this.logInForm.value);
    this.authService.signInWithEmailAndPassword(userData).then((res: any) => {
      this.router.navigateByUrl('home');
    }).catch((error: any) => {
      console.error(error);
    });
  }

  
}
