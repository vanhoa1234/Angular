import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadComponent } from 'app/_components/uploadfile.component';
import { CustomerService } from 'app/_services/customer.service';
import { CamundaRestService } from 'app/camunda-rest.service';
import { AddDocuementComponent } from 'app/form/AddDocument.component';
import { Assets } from 'app/schemas/Assets';
import { CicInfo } from 'app/schemas/CicInfo';
import { Collateral, CollateralRequest, CollateralResponse } from 'app/schemas/Collateral';
import { CompleteTaskRequest, CompleteTaskResponse } from 'app/schemas/CompleteTask';
import { Customer } from 'app/schemas/Customer';
import { ContentCustomer } from 'app/schemas/CustomerResponse';
import { DocumentCollateral } from 'app/schemas/DocumentCollateral';
import { ApprovalProcessRequest, Process, SaveProcessRequest, SaveProcessResponse, StartProcessRequest, StartProcessResponse, formData } from 'app/schemas/Process';
import { SearchCustomerRequest } from 'app/schemas/SearchCustomerRequest';
import { ToastrService } from "ngx-toastr";
import { TaskInfoComponent } from '../Task/TaskInfo.component';
import { CustomerComponent } from '../customer/customer.component';
@Component({
    selector: 'input-Document',
    templateUrl: 'gdv.component.html'
   // template:`<task-List *ngSwitchCase="'hello'" name="{{name}}">ddd</task-List> `
  })
  export class gdvComponent  implements OnInit,AfterViewInit  {
    @ViewChild('child') private child: FileUploadComponent;
    @ViewChild('document') private documentAdd: AddDocuementComponent;
    @ViewChild('customer') private customerInfoCmp: CustomerComponent;
    @ViewChild('taskinfo') private taskInfo: TaskInfoComponent;
    customerInfo: ContentCustomer;
    filter!:SearchCustomerRequest;
    @Input() customerInfoSelected!:ContentCustomer;
    collateral!:CollateralResponse;
    startProcess!: StartProcessResponse;
    template: string;
    documentName: string;
    processId!:string;
    startProcessRequest!: StartProcessRequest;
    completeTaskRequest!: CompleteTaskRequest;
    completeTaskResponse!: CompleteTaskResponse;
    collateralRequest!: CollateralRequest;
    CollateralResponse!: CollateralResponse;
    saveProcessRequest!:SaveProcessRequest;
    saveProcessResponse!: SaveProcessResponse;
    documentCollateral:Array<DocumentCollateral> = [];
    canSave!:boolean;
    canComplete:boolean;
    isApproval:boolean;
    collateralSelected!:Collateral;
    taskid!:string;
    isFirst:boolean;
    buttonApprovalText!:string;
    approvalProcessRequest:ApprovalProcessRequest;
    process:Process;
    cicList:CicInfo[];
    constructor(
        private toastr: ToastrService,
        private router: Router,
        private camundaRestService: CamundaRestService,
        private customerService: CustomerService,
        private route: ActivatedRoute) 
    {
    }
  ngAfterViewInit(): void {
      // if(this.taskInfo.taskDetail)
      // {
      //  if(this.taskInfo.taskDetail.assignee=="gdv") 
      //  {
      //    this.isFirst = true;
      //   }
      //  else this.isFirst =false;
      //  console.log(this.isFirst);
      // }
      // this.buttonApprovalText ="Gửi duyệt";
      // if(this.taskInfo.taskDetail.assignee=="qlquy") 
      // {
      //   this.buttonApprovalText ="Duyệt";
      // }
  }

    ngOnInit(){
      this.canSave = true;
      this.canComplete = true;
        this.processId = this.route.snapshot.paramMap.get('processId');
        this.startProcessRequest = new StartProcessRequest();
        this.startProcessRequest.processId =this.processId;
        this.startProcessRequest.formData = new formData();

        this.customerService.customer.subscribe(
         customer => {
          if(customer.cifNo)
          {
          this.customerInfo = customer;
          this.getCollateral(customer.cifNo);
          }
          else 
          {
            console.log("Không tìm thấy dữ liệu");
          }
         }
        ); 
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
        this.taskid = this.route.snapshot.paramMap.get('taskId');
      }
      
      completeTask()
      {
        this.saveProcessData();
        this.completeTaskRequest =new CompleteTaskRequest();
        this.completeTaskRequest.taskId = this.taskid;
         this.completeTaskRequest.formData =new formData();
        this.completeTaskRequest.formData.approval =true;
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
                        //Update  process Task
                        if(response.content)
                        {
                          console.log("TaskId:"+response.content.id);
                          this.updateProcess(this.taskid,response.content.id);
                        }
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

      
      updateProcess(taskId:string,newTaskId:string)
      {
        console.log("newTaskId:"+newTaskId);
        this.camundaRestService.getProcessByTask(taskId)
        .subscribe(
              response =>
              {
                if(response && response.status)
                {
                  this.process = response.content;
                  this.camundaRestService.updateProcess(this.process.process.id,newTaskId);
                }
              }
        );
      }
      getCollateral(cifNo:string)
      {
        this.collateralRequest = new CollateralRequest();
        this.collateralRequest.cifNo = cifNo;
        this.camundaRestService
        .getCollaterals(this.collateralRequest)
        .subscribe(
            response =>
            {
              if(response.status)
              {
                this.collateral=response;
              }
              else
              {
                this.collateral = new CollateralResponse();
              }
                
            }
        );
      }
      getCICInfo()
      {
        this.cicList =[];
        let cicInfo = new  CicInfo();
        cicInfo.bankName="TP Bank";
        cicInfo.debit=12000000000;
        //cicInfo.endDate =Date.now();
      }
      // Lưu thông tin hồ sơ tiếp nhận
      saveProcessData()
      {
        if(this.canSave)
        {
            this.makeRequestSave();
            this.camundaRestService
            .saveProcess(this.saveProcessRequest)
            .subscribe(
                response=>{
                    if(response.status)
                    {
                      this.saveProcessResponse= response;
                        this.toastr.info(
                            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Lưu thông tin hồ sơ thành công.</span>',
                            "",
                            {
                                timeOut: 4000,
                                closeButton: true,
                                enableHtml: true,
                                toastClass: "alert alert-success alert-with-icon"
                            }
                            );
                          
                          //  this.router.navigate(['/taskList']);
                            this.canSave = false;
                            this.canComplete = true;
                    }
                    else
                    {
                        this.toastr.error(
                            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Lưu thông tin hồ sơ thất bại.</span>',
                            "",
                            {
                                timeOut: 4000,
                                closeButton: true,
                                enableHtml: true,
                                toastClass: "alert alert-danger alert-with-icon"
                            }
                            );
                            this.canSave = true;
                            this.canComplete = false;
                    }
                }
            );
        }
        
      }
      makeRequestSave()
      {
        this.saveProcessRequest =new SaveProcessRequest();
        this.saveProcessRequest.customer = new Customer();
        this.saveProcessRequest.customer.cifNo= this.customerInfo.cifNo;
        this.saveProcessRequest.customer.idenfinity=this.customerInfo.cifNo;
        this.saveProcessRequest.customer.name= this.customerInfo.name.fullName;
        this.saveProcessRequest.customer.type = "CN";
        if(this.collateralSelected)
        {
          this.saveProcessRequest.assets = new Assets();
          this.saveProcessRequest.assets.cifNo= this.collateralSelected.cifNo;
          this.saveProcessRequest.assets.contractNo =this.collateralSelected.contractNo;
          this.saveProcessRequest.assets.tsbdCode =this.collateralSelected.type;
          this.saveProcessRequest.assets.tsbdType=this.collateralSelected.type;
          this.saveProcessRequest.assets.tsbdValue=this.collateralSelected.value;
        }
        this.saveProcessRequest.processIdCamunda=Date.now().toString();
        this.saveProcessRequest.taskId =this.taskid;
        let doc =new DocumentCollateral();
        for(let i=0;i<this.documentAdd.documentAdded.length
          ;i++)
          {
            doc.docCode=this.documentAdd.documentAdded[i].docCode;
            doc.docName=this.documentAdd.documentAdded[i].docName;
            doc.docType=this.documentAdd.documentAdded[i].docType;
            doc.pathNameEcm =this.documentAdd.documentAdded[i].url;
            this.documentCollateral.push(doc);
            doc =new DocumentCollateral();
          }
        this.saveProcessRequest.doc=this.documentCollateral;
      }
      
  }