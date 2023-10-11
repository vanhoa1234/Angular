import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'app/_services/customer.service';
import { CamundaRestService } from 'app/camunda-rest.service';
import { TaskInfo } from 'app/schemas/Task';
import { ToastrService } from "ngx-toastr";
@Component({
    moduleId: module.id,
    selector: 'task-info',
    templateUrl: 'TaskInfo.component.html'
   // template:`<task-List *ngSwitchCase="'hello'" name="{{name}}">ddd</task-List> `
  })
  export class TaskInfoComponent implements OnInit {
    taskInfo!:TaskInfo;
    taskid!:string;
    constructor(
        private toastr: ToastrService,
        private camundaRestService: CamundaRestService,
        private customerService: CustomerService,
        private router:Router,
        private route: ActivatedRoute) 
    {
    }
    ngOnInit(){
        this.taskid = this.route.snapshot.paramMap.get('taskId');
        this.getTaskDetail();
        
    }
    public get taskDetail()
    {
       return this.taskInfo;
    }
     getTaskDetail(): void {
      this.camundaRestService
          .getTaskInfo(this.taskid)
          .subscribe(
            response => {
                if(response.status)
                {
                    this.taskInfo = response.content[0];
                    console.log("Begin sub");
                    if(this.taskInfo)
                    {
                        this.customerService.changeTask(this.taskInfo);
                        console.log("End sub1");
                    }
                    console.log("End sub2");
                }
                else
                {
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