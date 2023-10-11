import { Assets } from "./Assets";
import { Customer } from "./Customer";
import { DocumentCollateral } from "./DocumentCollateral";

export class StartProcessRequest
{
    processId!:string;
    formData!:formData;
}
export class StartProcessResponse
{
    status:boolean;
    content!:string;
}
export class formData
{
    approval!:boolean;
}

export class SaveProcessRequest
{
  customer:Customer;
  assets:Assets;
  processIdCamunda!:string;
  taskId!:string;
  doc:DocumentCollateral[];
}
export class SaveProcessResponse
{
status!: boolean;
}
export class ApprovalProcessRequest
{
    transCode!:string;
    approve:boolean;
}
export class ApprovalProcessResponse
{
    status!:string;
    content1:string;
}
export class Process{
  customer:Customer;
  assets:Assets;
  processIdCamunda!:string;
  taskId!:string;
  doc:DocumentCollateral[];
  process:Proc;
}
export class Proc{
    id:number;
    transCode!:string;
}
export class ProcessResponse{
   status:boolean;
   content!:Process;
   message!:string;
}
export class UpdateProcessTaskRequest
{
    id:number;
    taskId: string;
}