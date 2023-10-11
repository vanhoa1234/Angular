import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadComponent } from 'app/_components/uploadfile.component';
import { CustomerService } from 'app/_services/customer.service';
import { CamundaRestService } from 'app/camunda-rest.service';
import { AddDocuementComponent } from 'app/form/AddDocument.component';
import { Assets } from 'app/schemas/Assets';
import { Collateral, CollateralRequest, CollateralResponse } from 'app/schemas/Collateral';
import { CompleteTaskRequest, CompleteTaskResponse } from 'app/schemas/CompleteTask';
import { Customer } from 'app/schemas/Customer';
import { ContentCustomer } from 'app/schemas/CustomerResponse';
import { DocumentCollateral } from 'app/schemas/DocumentCollateral';
import { SaveProcessRequest, SaveProcessResponse, StartProcessRequest, StartProcessResponse, formData } from 'app/schemas/Process';
import { SearchCustomerRequest } from 'app/schemas/SearchCustomerRequest';
import { ToastrService } from "ngx-toastr";
import { CustomerComponent } from '../customer/customer.component';
@Component({
    selector: 'start-Process',
    templateUrl: 'StartProcess.Component.html'
   // template:`<task-List *ngSwitchCase="'hello'" name="{{name}}">ddd</task-List> `
  })
  export class StartProcessComponent  implements OnInit,AfterViewInit  {
    @ViewChild('child') private child: FileUploadComponent;
    @ViewChild('document') private documentAdd: AddDocuementComponent;
    @ViewChild('customer') private customerInfoCmp: CustomerComponent;
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
    constructor(
        private toastr: ToastrService,
        private router: Router,
        private camundaRestService: CamundaRestService,
        private customerService: CustomerService,
        private route: ActivatedRoute) 
    {
    }
  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
    //console.log("ngAfterViewInit");
  }

    ngOnInit(){
      this.canSave = false;
      this.canComplete = true;
        this.processId = this.route.snapshot.paramMap.get('processId');
        this.startProcessRequest = new StartProcessRequest();
        this.startProcessRequest.processId =this.processId;
        this.startProcessRequest.formData = new formData();
        // this.customerService.customer.subscribe(
        //  customer => {
        //   if(customer.cifNo)
        //   {
        //   this.customerInfo = customer;
        //   this.getCollateral(customer.cifNo);
        //   }
        //   else 
        //   {
        //     console.log("Không tìm thấy dữ liệu");
        //   }
        //  }
        // );  
        // this.camundaRestService.getProcess(2).subscribe(
        //   response => {
        //     console.log("Service get process detail:" + response.content[0].process.transCode);
        //   }
        // );
      }
     
      completeTask()
      {
        //this.canSave = true;
        //this.saveProcessData();
        this.camundaRestService
        .startProcess(this.startProcessRequest)
        .subscribe(
            response=>{
                this.startProcess= response;
                if(this.startProcess.status)
                {
                    this.toastr.info(
                        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Khởi tạo luồng quy trình thành công.</span>',
                          "",
                          {
                            timeOut: 4000,
                            closeButton: true,
                            enableHtml: true,
                            toastClass: "alert alert-success alert-with-icon"
                          }
                        );
                        this.router.navigate(['/taskList']);
                }
                else
                {
                    this.toastr.error(
                        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Khởi tạo luồng quy trình thất bại.</span>',
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
      getProcess(id:number)
      {
        this.camundaRestService.getProcess(id)
        .subscribe(
              response =>
              {
                console.log("get process response" + response);
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
        this.saveProcessRequest.processIdCamunda="Process_Nhap_kho";
        this.saveProcessRequest.taskId = Date.now().toString();
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