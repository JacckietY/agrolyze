import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{

  public hide: boolean = true;
  public regForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.regForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  public register() {
    const userData = Object.assign(this.regForm.value);
    this.authService.registerWithEmailAndPassword(userData).then((res: any) => {
      this.router.navigateByUrl('sign-in');
    }).catch((error: any) => {
      console.error(error);
    });
  }

  public onCancel() {
    this.router.navigateByUrl('sign-in');
  }

}
