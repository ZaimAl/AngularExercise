import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  userList: any[] = [];
  pages:number[]=[];
  employee!:any;
  value: number = 0;
  page: number = 0;
  length: number = 10;
  switchValue: string = 'index';
  searchText: string = '';
  detailForm!: FormGroup;
  groupList:any[]=[];
  statusList:any[]=[];
  lenghtList:any[]=[];
  selectedLength: number | null = null;
  sortNo:boolean=true;
  sortOrder: 'asc' | 'desc' = 'asc';
  sortColumn: string  = '';
  statusOnClick='';
  constructor(private service:EmployeeService,private router:Router) {
    this.detailForm=this.service.createForm();
  }

  ngOnInit(): void {
    this.getAllUser(this.value,this.searchText);
    this.groupList=this.service.groupList;
    this.lenghtList=this.service.lenghtList;
    this.statusList=this.service.statusList;
  }
  getAllUser(value: number,searchText:string) {
    this.service.getAll().subscribe({
      next: (response: any) => {
        if(this.sortNo){
          this.userList = response.reverse();
        }else{
          this.userList = response;
        }
        this.userList.sort((a, b) => {
          const aValue = this.sortColumn=='birthDate'? new Date(a[this.sortColumn]):a[this.sortColumn];
          const bValue = this.sortColumn=='birthDate'? new Date(b[this.sortColumn]):b[this.sortColumn]
      
          if (this.sortOrder === 'asc') {
            return aValue < bValue ? -1 : 1;
          } else {
            return aValue > bValue ? -1 : 1;
          }
        });
        this.userList = this.userList.filter(user =>
          (user.firstName + ' ' + user.lastName).toLowerCase().includes(searchText.toLowerCase())
        );
        this.page = Math.ceil(this.userList.length / this.length);
        this.pages=Array(this.page);
        this.userList = this.userList.slice(value * this.length, (value + 1) * this.length);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  getDetail(id:any){
    this.employee=[];
    this.service.getOne(id).subscribe({
      next: (response: any) => {
        this.employee = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.switchValue='detail';
  }
  updatePage(newPage: number): void {
    this.value = newPage;
    this.getAllUser(this.value,this.searchText);
  }
  findName(){
    this.getAllUser(this.value,this.searchText);
  }
  onSubmit(){
    const value=this.detailForm.getRawValue();
    let postData=JSON.stringify(value);
    this.service.create(postData).subscribe({
      next: () => {
        this.getAllUser(this.value,this.searchText);
        this.switchValue = 'index';
      },
      error: error => {
        console.log(error);
      }
    })
  }
  onLogOut(){
    localStorage.removeItem('token');
    setTimeout(()=>{
      this.router.navigateByUrl('/login')
    },300)
  }
  sortLength() {
    if (this.selectedLength !== null) {
      this.length = this.selectedLength;
      this.getAllUser(this.value, this.searchText);
    }
  }
  sortUsername() {
    this.sortOrder = this.sortColumn === 'username' && this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortColumn = 'username';
    this.getAllUser(this.value, this.searchText);

  }
  sortFullName(){
    this.sortOrder = this.sortColumn === 'firstName' && this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortColumn = 'firstName';
    this.getAllUser(this.value, this.searchText);
  }
  sortBirthDate() {
    this.sortOrder = this.sortColumn === 'birthDate' && this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortColumn = 'birthDate';
    this.getAllUser(this.value, this.searchText);

  }
  sortBasicSalary() {
    this.sortOrder = this.sortColumn === 'basicSalary' && this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortColumn = 'basicSalary';
    this.getAllUser(this.value, this.searchText);
  }
  sortNumber(){
    this.sortNo=!this.sortNo;
    this.sortColumn='';
    this.getAllUser(this.value, this.searchText);
  }
  onClickEditButton() {
		this.statusOnClick = 'edit';
	}

	onClickDeleteButton() {
		this.statusOnClick = 'delete';
	}

	onClickCloseButton() {
		this.statusOnClick = '';
	}
}
