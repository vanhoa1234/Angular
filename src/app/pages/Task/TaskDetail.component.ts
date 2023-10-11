import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'app/_services/customer.service';
import { CamundaRestService } from 'app/camunda-rest.service';
import { CollateralRequest, CollateralResponse } from 'app/schemas/Collateral';
import { CompleteTaskRequest, CompleteTaskResponse, formData } from 'app/schemas/CompleteTask';
import { ContentCustomer } from 'app/schemas/CustomerResponse';
import { ApprovalProcessRequest, StartProcessRequest, StartProcessResponse } from 'app/schemas/Process';
import { SearchCustomerRequest } from 'app/schemas/SearchCustomerRequest';
import { ToastrService } from "ngx-toastr";
import { TaskInfoComponent } from './TaskInfo.component';
@Component({
    selector: 'taskdetail',
    moduleId: module.id,
    templateUrl: 'TaskDetail.component.html'//
   // template:`<task-List *ngSwitchCase="'hello'" name="{{name}}">ddd</task-List> `
  })
  export class TaskDetailComponent implements OnInit,AfterViewInit  {
    @Input() type: string;
    @Input() name: string;
    @ViewChild('taskinfo') private taskInfo: TaskInfoComponent;
    customerInfoc!:any;
    filter!:SearchCustomerRequest;
    customerInfo!:ContentCustomer;
    collateral!:CollateralResponse;
    startProcess!: StartProcessResponse;
    template: string;
    documentName: string;
    taskid!:string;
    startProcessRequest!: StartProcessRequest;
    completeTaskRequest!: CompleteTaskRequest;
    completeTaskResponse!: CompleteTaskResponse;
    collateralRequest!: CollateralRequest;
    CollateralResponse!: CollateralResponse;
    canSave!:boolean;
    canComplete:boolean;
    isApproval:boolean;
    tranCode!:string;
    isFirst:boolean;
    buttonApprovalText!:string;
    approvalProcessRequest:ApprovalProcessRequest;
    constructor(
        private toastr: ToastrService,
        private camundaRestService: CamundaRestService,
        private router:Router,
        private customerService: CustomerService,
        private route: ActivatedRoute) 
    {
    }
    ngAfterViewInit(): void {
      // this.buttonApprovalText ="Gửi duyệt";
      // if(this.taskInfo.taskDetail)
      // {
      //  if(this.taskInfo.taskDetail.assignee=="gdv") 
      //  {
      //    this.isFirst = true;
      //   }
      //  else this.isFirst =false;
      //  if(this.taskInfo.taskDetail.assignee=="qlquy") 
      // {
      //   this.buttonApprovalText ="Duyệt";
      // }
      // }
    }
    ngOnInit(){
        this.canSave = false;
        this.canComplete =true; 
        this.filter = new SearchCustomerRequest();
        this.filter.cifNo ="126002600";
        this.filter.idNo ="643820006000";
        this.filter.idType ="CCCD";
        this.filter.searchType="02";
        this.getCustomer();
        this.getCollateral();
        this.tranCode="GD0000109";
        this.buttonApprovalText ="Gửi duyệt";
        this.taskid = this.route.snapshot.paramMap.get('taskId');   
        this.customerService.taskInfo.subscribe(
          taskInfo => {
           if(taskInfo && taskInfo.assignee)
           {
            if(taskInfo.assignee=="gdv") 
            {
              this.isFirst = true;
             }
            else this.isFirst =false;
           }
           else 
           {
             console.log("Không tìm thấy dữ liệu task");
           }
          }
         );       
    }
    
    getCustomer(): void {
        this.camundaRestService
          .getCustomer(this.filter)
          .subscribe(
            response => {
              if(response.status)
              {
                this.customerInfo = response.content[0];
              }
            }
            );
      }
      completeTask(approval:boolean)
      {
        this.completeTaskRequest =new CompleteTaskRequest();
        this.completeTaskRequest.taskId = this.taskid;
        this.completeTaskRequest.formData =new formData();
        this.completeTaskRequest.formData.approval = approval;
        if(approval && this.taskInfo.taskDetail.assignee=="qlquy")
        {
          this.approvalProcessRequest = new ApprovalProcessRequest();
          this.approvalProcessRequest.approve=true;
          this.approvalProcessRequest.transCode = this.tranCode;
          this.approval(this.approvalProcessRequest);
        }
        this.camundaRestService
        .completeTask(this.completeTaskRequest)
        .subscribe(
            response=>{
                this.completeTaskResponse = response;
                if(this.completeTaskResponse.status)
                {
                    this.toastr.info(
                        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Gửi duyệt thành công.</span>',
                          "",
                          {
                            timeOut: 4000,
                            closeButton: true,
                            enableHtml: true,
                            toastClass: "alert alert-success alert-with-icon"
                          }
                        );
                        this.router.navigate(['/taskList']);
                        this.canSave = false;
                        this.canComplete = true;
                }
                else
                {
                    this.toastr.error(
                        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Gửi duyệt thất bại.</span>',
                          "",
                          {
                            timeOut: 4000,
                            closeButton: true,
                            enableHtml: true,
                            toastClass: "alert alert-danger alert-with-icon"
                          }
                        );
                        this.canSave = false;
                        this.canComplete = true;
                }
            }
        );
      }
      approval(req:ApprovalProcessRequest)
      {
        this.camundaRestService
        .ApprovalInputProcess(req)
        .subscribe(
          response => {
                return true;
          }
        );
      }
      getCollateral()
      {
        this.collateralRequest = new CollateralRequest();
        this.collateralRequest.cifNo = this.filter.cifNo;
        this.camundaRestService
        .getCollaterals(this.collateralRequest)
        .subscribe(
            response =>
            {
              if(response.status)
              {
                this.collateral=response;
              }
              
            }
        );
      }
  }