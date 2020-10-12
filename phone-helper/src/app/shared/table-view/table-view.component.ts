import { animate, state, style, transition, trigger } from '@angular/animations';
import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import {ExportService} from '../_services/export.service';



@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableViewComponent implements OnInit {
  @Input() DATA:any[]
  @Input() lastColumn:number
  @Input() buttons:string[]

  @Output() buttonClickedEvent = new EventEmitter();

  columns:Array<any>
  displayedColumns:Array<any> = []
  columnsToDisplay:string[] =[]
  dataSource:any
  
  expandedElement: any | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
constructor(public exportService:ExportService){}
  ngOnInit() {
    this.setDATA(this.DATA)
    if(!this.lastColumn){this.lastColumn=4}

  }
 setDATA(DATA){
   console.log("setDATA",DATA)
  try{
        // Get list of columns by gathering unique keys of objects found in DATA.
    const columns = DATA
    .reduce((columns, row) => {
    return [...columns, ...Object.keys(row)]
    }, [])
    .reduce((columns, column) => {
    return columns.includes(column)
      ? columns
      : [...columns, column]
    }, [])
    // Describe the columns for <mat-table>.
    this.columns = columns.map(column => {
    return { 
    columnDef: column,
    header: column,
    cell: (element: any) => `${element[column] ? element[column] : ``}`     
    }
    })
 
    // Set all headers for <mat-table> exept id's
    this.displayedColumns = this.columns.map(c => c.columnDef)
                                        .filter(e => !(e.includes("id") || (e.includes("URL")) || (e.includes("ID"))));;
    // Set visable headers for <mat-table>. remove actions if exust
    this.columnsToDisplay = this.displayedColumns.slice(0,this.lastColumn)
                                                 .filter(e => !e.includes("actions"));;
    //add actions to headers                                             
    this.columnsToDisplay.push("actions")


    console.log(DATA)
    // Set the dataSource for <mat-table>.
    this.dataSource = DATA
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    }catch(err){}
 }
buttonClicked(button:string,item:any,event){
  event.preventDefault();
  event.stopPropagation();
  const evt = {button:button,item:item}
this.buttonClickedEvent.emit(evt)
}
 changeColumn(){
  console.log("displayed Columns: ",this.displayedColumns)
  console.log("columns To Display: ",this.columnsToDisplay)
 }
 log(row){
   console.log(row)
 }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.DATA){
     this.setDATA(changes.DATA.currentValue)
    } 
  }

  ngAfterViewInit() {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsToDisplay, event.previousIndex, event.currentIndex);
  }

  export() {
    this.exportService.exportExcel(this.DATA, 'export data');
  }


}


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'spaceByUpperCase'})
export class spaceByUpperCase implements PipeTransform {
  transform(value: string): string {
    const splitArr = value.split(/(?=[A-Z])/)
    let string = splitArr.join(" ")
    string = string.replace('I D',"ID")
    string = string.charAt(0).toUpperCase() + string.slice(1);
    return string
  }
}


@Pipe({
  name: 'parseString',
  pure: false
})
export class FetchJsonPipe implements PipeTransform {


  constructor() { }

  transform(text: any,type?:string): any {
    if (typeof text === 'string') {
      return text
  }
  else if (typeof text === 'object' && type === 'long'){
    
    return JSON.stringify(text)
    .replace(/:/g, ": ")
    .replace(/]/g, " ")
    .replace(/{/g, " [ ")
    .replace(/}/g, " ] ")
    .replace(/,/g, " ")
    .replace(/"/g, " ")
    }
    else if (typeof text === 'object' && type === 'short'){
      let string = ''
      try { 
      text.forEach(obj => {
        let str = ''
        
          str = str + obj.name 
      });
    } catch(err){
      string = string + ', ' + text.name  

    }
    
    
      return string
      } else return
  }
}