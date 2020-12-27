import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { StoreDatatoLocalstorageService } from './store-datato-localstorage.service';
import { StudentData } from '././interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  
  isEdit = false;
  userSubmitted = false;
  studentList: StudentData[] = [];



  studentForm = this.fb.group({
    iD: ['', Validators.required],
    studentName: [null, Validators.required],
    fatherName: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]]
  });

      //Getter Methods for all our Form Controls....

      get studentName() {
        return this.studentForm.get('studentName') as FormControl;
      }
    
      get fatherName() {
        return this.studentForm.get('fatherName') as FormControl;
      }
    
      get email() {
        return this.studentForm.get('email') as FormControl;
      }
    // ******************End of Getter Method for Form Controls...


  // onSubmit() { 
  //   console.log(this.studentForm);
  // }

  constructor(private fb: FormBuilder, private service: StoreDatatoLocalstorageService) {}
  
  ngOnInit() {
    debugger;
    //once page loaded, first data has to retrive from storage and show it in view/table
    this.retriveData();

  }



  submitData() {
    debugger;
    // console.log(this.studentForm.value);

    this.userSubmitted = true;

    if (this.studentForm.valid){

  
    let _data:StudentData = this.studentForm.value;

    if (!this.isEdit) { 
      this.service.setData(_data);
      
    } else {
      // alert("this goes edit function");
      
      this.service.updateData(_data);
      this.isEdit = false;
    }

    //Once submit data, form has to reset to empty.
    this.studentForm.reset();
    this.userSubmitted = false;

    debugger;
    //Once submit data, data has to store in local also view in table/userview.
    this.retriveData();
  }
  }


// To recive data from local storage to table.
  retriveData() {
    debugger;
    this.studentList = this.service.getData()
    
  }

// First create form data, once modal opened.
createData() {
debugger;
  let desList =  this.service.getData();

  let iD =1;

  if (desList && desList.length>0) {
    let list= desList.sort(function(a, b){return b.iD-a.iD});
        iD=list[0].iD+1;
  } 

this.studentForm.patchValue({
  iD: iD ,
  studentName:null,
  fatherName: null,
  email: null,
});

}


// to select the particular ID and pop up the data in modal.
  editData(iD:any) {

    this.isEdit=true;

    for (var i = 0; i < this.studentList.length; i++) {

      if (iD == this.studentList[i].iD) {

        this.studentForm.patchValue({

          // set the value to the form once edit button clicked
          iD: this.studentList[i].iD,
          studentName: this.studentList[i].studentName,
          fatherName: this.studentList[i].fatherName,
          email: this.studentList[i].email
        });
   }
  }
}

  deleteData(index:number) {

    this.service.deleteSelectedRow(index);

    //once deleted data has to retrive from storage and show it in view/table
    this.retriveData();

  }

}
