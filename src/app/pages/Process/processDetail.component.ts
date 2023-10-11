import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'app/_services/customer.service';
import { CamundaRestService } from 'app/camunda-rest.service';
import { ToastrService } from "ngx-toastr";
import { ProcessListResponse } from '../../schemas/ProcessResponse';
@Component({
    selector: 'input-Document',
    templateUrl: 'processDetail.component.html'
   // template:`<task-List *ngSwitchCase="'hello'" name="{{name}}">ddd</task-List> `
  })
  export class ProcessDetailComponent  implements OnInit  {
    processId!:string;
    taskid!:string;
    process!: ProcessListResponse | null;
    constructor(
        private toastr: ToastrService,
        private router: Router,
        private camundaRestService: CamundaRestService,
        private customerService: CustomerService,
        private route: ActivatedRoute) 
    {
    }

    ngOnInit(){
        this.processId = this.route.snapshot.paramMap.get('processId');
        this.taskid = this.route.snapshot.paramMap.get('taskId');
        this.getProcess();
      }
      
      getProcess()
      {
        this.camundaRestService.getProcess(Number(this.processId)).subscribe(
          response => { this.process = response;
            console.log("Service get process detail:" + response.content[0].process.transCode);
          }
        );
      }
      
      
  }