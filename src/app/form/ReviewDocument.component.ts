import { Component, OnInit } from '@angular/core';
import { CollateralResponse } from '../schemas/Collateral';
import { ContentCustomer, CustomerResponse } from '../schemas/CustomerResponse';
declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'review-document',
    moduleId: module.id,
    templateUrl: 'ReviewDocument.component.html'
})

export class ReviewDocuementComponent implements OnInit{
    
    customers!: CustomerResponse | null;
    collateral!: CollateralResponse;
    public tableData1: TableData;
    public tableData2: TableData;
    customerInfo!:any;
    customerInfoc!:any;
    canSave:boolean;
    canComplete:boolean;
    documentName:string;
    isApproval:boolean;
    isFirst:boolean;
    ngOnInit(){
    this.canSave = true;
    this.canComplete = false;
    this.customerInfo = new ContentCustomer();
    this.customerInfo.cifNo ="cifNo";
    }
    completeTask()
    {    
    }
    saveProcessData()
    {   
    }
}
