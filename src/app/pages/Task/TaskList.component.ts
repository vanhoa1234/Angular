import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CamundaRestService } from '../../camunda-rest.service';
import { TaskResponse } from '../../schemas/Task';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'taskList',
    moduleId: module.id,
    templateUrl: 'TaskList.component.html'
})

export class TaskListComponent implements OnInit{
    tasks!: TaskResponse | null;
    public tableData1: TableData;
    public tableData2: TableData;

    constructor(
        private toastr: ToastrService,
        private camundaRestService: CamundaRestService,
        private route: ActivatedRoute) 
    {
    }

    ngOnInit(){
        this.getTasks();
    }

    getTasks(): void {
        this.camundaRestService
          .getTasks()
          .subscribe(tasks => {
            if(tasks.status)
            {
                this.tasks = tasks;
            }
            else
            {
                this.tasks = new TaskResponse();
                this.toastr.info(
                    '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Lấy thông tin Task thất bại.</span>',
                      "",
                      {
                        timeOut: 4000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-danger alert-with-icon"
                      }
                    );
            }
            
            
        }
            );
      }
}
