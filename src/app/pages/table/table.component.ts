import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CamundaRestService } from '../../camunda-rest.service';
import { TaskResponse } from '../../schemas/Task';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit{
    tasks!: TaskResponse | null;
    formKey: string;
    public tableData1: TableData;
    public tableData2: TableData;

    constructor(
        private camundaRestService: CamundaRestService,
        private route: ActivatedRoute) 
    {
    }

    ngOnInit(){
        this.getTasks();
    }

    getForm(taskId){
        this.camundaRestService
          .getTaskById(taskId)
          .subscribe(formKey => this.formKey = formKey.content[0].formKey);
        //  if(this.formKey==undefined) location.href='#/default?taskId='+taskId;
        //  else location.href='#/'+this.camundaRestService.getPath(this.formKey)+'?taskId='+taskId;
    }

    getTasks(): void {
        this.camundaRestService
          .getTasks()
          .subscribe(tasks => {
            this.tasks = tasks;
            console.log(this.tasks );
        }
            );
      }
}
