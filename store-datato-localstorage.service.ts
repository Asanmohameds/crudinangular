import { Injectable } from '@angular/core';
import { StudentData } from './interface';

@Injectable({
  providedIn: 'root'
})
export class StoreDatatoLocalstorageService {

  constructor() { }


// pussing data to array.
  setData(formData:StudentData) {
    debugger;
    let myArray=[formData];

    let tableList =  this.getData();

     tableList = [...tableList, ...myArray];
    
    // tableList.push(myObj);

     this.settingStringifyData(tableList);
    
  }


  // Parsing/getting data from local storage.
  getData() {
    debugger;

    let deserialized_data:StudentData[] =[];
    let get_myObj:any = localStorage.getItem("myObj_String");

    if (get_myObj){
      deserialized_data = JSON.parse(get_myObj);
    }
    return deserialized_data;
  }

  // setting/stringify data to local storage..
  settingStringifyData(tableList:StudentData[]) {

    let serializedData = JSON.stringify(tableList);
    let settingData = localStorage.setItem("myObj_String", serializedData);

    return settingData;

  }

 
// updating the data and store it on same appropriate ID.
  updateData(formData:any) {
    // console.log(formData);

    let tableList =  this.getData();

    for (var i = 0; i < tableList.length; i++) {

        if (formData['iD'] == tableList[i].iD) {
            tableList[i] = formData;
            alert ("Updated successfully");
        }
    }
    this.settingStringifyData(tableList);
  }


// deleting  the selected index by splice method.
  deleteSelectedRow(index:number) {
    debugger
  
    let tableList =  this.getData();

    tableList.splice(index, 1);

    
    this.settingStringifyData(tableList);
  
    // var serializedData = JSON.stringify(tableList);
    // localStorage.setItem("myObj_String", serializedData);

  
  }

}



