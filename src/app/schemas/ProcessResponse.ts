import { Assets } from "./Assets";
import { Customer } from "./Customer";

export class ProcessListResponse {
    status!: boolean;
    content!: ContentProcess[];
    message!:string;
    code!:string;
  }
  class ContentProcess {
    customer!: Customer;
    process!: Process;
    storeAsset!: Assets;
    documents!: DocumentLst[];
  }
  export class Process {
    id!: number;
    transCode!: string;
    borrowDate!: Date | null;
    payDate!: Date | null;
    type!: string;
    status!:string;
    processIdCamunda!: string;
    taskId!:string;
    customerId!:string;
  }
  export class DocumentLst{
    transCode!: string;
    docCode!: string;
    docName!: string;
    docType!: string;
    storeTsdbId!:string;
  }
  