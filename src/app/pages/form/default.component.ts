import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompleteTaskRequest } from 'app/schemas/CompleteTask';
import { CamundaRestService } from '../../camunda-rest.service';

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'default.component.html'
})

export class DefaultComponent implements OnInit{
    taskId!: string;
req:CompleteTaskRequest;
    constructor(
        private camundaRestService: CamundaRestService,
        private route: ActivatedRoute) {
            this.route.queryParams.subscribe(params => {
                this.taskId = params['taskId'];
                
            });
      }
    ngOnInit(){
    }
    complete(){
        if (this.taskId  != null) {
            this.req.taskId =this.taskId;
            this.camundaRestService.completeTask(this.req);
          }
    }
}
