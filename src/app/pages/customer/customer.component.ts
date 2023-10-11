import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'app/_services/customer.service';
import { SearchCustomerRequest } from 'app/schemas/SearchCustomerRequest';
import { ToastrService } from "ngx-toastr";
import { CamundaRestService } from '../../camunda-rest.service';
import { CustomerResponse } from '../../schemas/CustomerResponse';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'customer-cmp',
    moduleId: module.id,
    templateUrl: 'customer.component.html'
})

export class CustomerComponent implements OnInit{
    filter!:SearchCustomerRequest;
    processId!:string;
    customers!: CustomerResponse | null;
    public tableData1: TableData;
    public tableData2: TableData;
    @Output() onSelected = new EventEmitter<any>();
    @Output() onSearch = new EventEmitter<any>();
    constructor(
        private toastr: ToastrService,
        private router: Router,
        private camundaRestService: CamundaRestService,
        private customerService: CustomerService,
        private route: ActivatedRoute) 
    {
    }
    
    ngOnInit(){
        this.filter = new SearchCustomerRequest();
        this.processId ="Process_Nhap_kho";
    }
    search()
    {
      
      this.getCustomer()
      if(this.customers)
      {
         this.customerService.changeCustomer(this.customers.content[0]);
      }
    }
    // public get customerInfo()
    // {
    //   return this.customers.content[0];
    // }
    getCustomer(): void {
        this.camundaRestService
          .getCustomer(this.filter)
          .subscribe(customers => {
            this.customers = customers;
            if(!this.customers.status)
            {
                this.toastr.info(
                    '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Có lỗi xảy ra. Vui lòng thử lại!</span>',
                      "",
                      {
                        timeOut: 4000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-danger alert-with-icon"
                      }
                    );
            }
            else
            {
            }
            
        }
      );
      }
}
