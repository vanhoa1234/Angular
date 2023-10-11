import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CamundaRestService } from '../../camunda-rest.service';
import { ProcessListResponse } from '../../schemas/ProcessResponse';

@Component({
    selector: 'list-process',
    moduleId: module.id,
    templateUrl: 'listProcess.component.html'
})

export class listProcessComponent implements OnInit{
    processes!: ProcessListResponse | null;

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
          .getAllProcess()
          .subscribe(response => {
            if(response.status)
            {
                this.processes = response;
            }
            else
            {
                this.processes = new ProcessListResponse();
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
