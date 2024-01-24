import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  detailForm!: FormGroup;
  errorMessage: string | undefined;

  constructor(private formBuilder: FormBuilder,private router:Router){
    this.detailForm = this.createForm();
  }

  createForm(){
    return this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(){
    this.errorMessage = undefined;
    const value = this.detailForm.getRawValue();
    if(value.username=="admin" && value.password=='123'){
      localStorage.setItem('token','token');
      setTimeout(()=>{
        this.router.navigateByUrl('/')
      },300)
    }else{
      this.errorMessage = "Username or password is wrong";
    }

  }
}
