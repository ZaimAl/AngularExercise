import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url:string='http://localhost:3000/employee';

  constructor(private http:HttpClient,private formbuilder:FormBuilder) {}
  getAll() {
    return this.http.get(this.url);
  }
  getOne(id: string | number) {
    return this.http.get(`${this.url}?id=${id}`);
  } 
  create(body: any) {
    return this.http.post(this.url, body);
  }
  createForm(){
     return this.formbuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      birthDate: ['', [this.validateBirthDate]],
      basicSalary: ['', [Validators.required,this.validateBasicSalary]],
      status: ['', Validators.compose([Validators.required])],
      group: ['', Validators.compose([Validators.required])],
      description: ['',],
      id: ['', Validators.required]
    });
  }
  validateBirthDate(control: AbstractControl): { [key: string]: any } | null {
    const birthDate = new Date(control.value);
    const today = new Date();
  
    if (birthDate > today) {
      return { 'futureDate': { valid: false, message: 'Birth Date cannot be in the future.' } };
    }
    return null;
  }
  validateBasicSalary(control: AbstractControl): { [key: string]: any } | null {
    const salary = parseFloat(control.value);
  
    if (isNaN(salary) || salary < 1) {
      return { 'invalidSalary': { valid: false, message: 'Basic Salary cannot be less than 1.' } };
    }
  
    return null;
  }
  groupList = [
    {
      id: 'Frontend',
      name: 'Frontend'
    },
    {
      id: 'UI/UX',
      name: 'UI/UX'
    },
    {
      id: 'Backend',
      name: 'Backend'
    },
    {
      id: 'QA',
      name: 'QA'
    },
    {
      id: 'Manager',
      name: 'Manager'
    },
    {
      id: 'Staff',
      name: 'Staff'
    },
    {
      id: 'Customer Service',
      name: 'Customer Service'
    },
    {
      id: 'CEO',
      name: 'CEO'
    },
    {
      id: 'Finance',
      name: 'Finance'
    },
    {
      id: 'Security',
      name: 'Security'
    }
  ];
  lenghtList=[
    {id:5},{id:15},{id:20}
  ];
  statusList=[
    {
      id:1,
      status:'Active'
    },
    {
      id:0,
      status:'In Active'
    }
  ]

}
