import { Component, OnInit } from '@angular/core';
import { CamundaRestService } from 'app/camunda-rest.service';
import { UploadFileRequest } from 'app/schemas/AttachFile';
import { DocumentCollateral } from 'app/schemas/DocumentCollateral';
import { ToastrService } from 'ngx-toastr';
import { Observable, ReplaySubject } from 'rxjs';
@Component({
    selector: 'add-document',
    moduleId: module.id,
    templateUrl: 'AddDocument.component.html'
})

export class AddDocuementComponent implements OnInit{
    documentList:DocumentCollateral[];
    document!:DocumentCollateral;
    documentTypeSelected!:any;
    documentType!:any;

    selectedFiles?: FileList;
    currentFile?: File;
    progress = 0;
    message = '';
    base64Output!:string;
    fileInfos?: Observable<any>;
    req!: UploadFileRequest;
    constructor(
      private toastr: ToastrService,
      private ecmServices: CamundaRestService) {}
    ngOnInit(){
        this.document = new DocumentCollateral();
        this.documentList =[];
        this.documentType = [{ name: "Sổ đỏ",value:"01"},{ name: "Giấy phép",value:"02"}]
    }
    public get documentAdded()
    {
        return this.documentList;
    }
    addDocument()
    {
        
        this.document.docType = this.documentTypeSelected.value;
        this.document.docTypeName = this.documentTypeSelected.name;
        if(this.currentFile)
        {
        this.document.url = this.currentFile.name;
        }
        this.documentList.push(this.document);
        this.document = new DocumentCollateral(); 
    }
    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
        this.currentFile = event.target.files[0];
        this.convertFile(event.target.files[0]).subscribe(base64 => {
          this.base64Output = base64;
        });
      }
      
      convertFile(file : File) : Observable<string> {
        const result = new ReplaySubject<string>(1);
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (event) => result.next(btoa(event.target.result.toString()));
        return result;
      }
     
      removeItem(d){
        const index = this.documentList.indexOf(d);
        this.documentList.splice(index, 1);
    }
    upload(): void {
      this.progress = 0;
  
      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);
  
        if (file) {
          this.currentFile = file;
          this.req = new UploadFileRequest();
          this.req.cifNo="00001";
          this.req.code="customer";
          this.req.userName="demo";
          this.req.contentType ="application/xls";
          this.req.file=this.base64Output;
          this.ecmServices.uploadFile(this.req)
          .subscribe(response =>
            {
              if(response.status)
              {
                this.toastr.info(
                  '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Upload file thành công</span>',
                    "",
                    {
                      timeOut: 4000,
                      closeButton: true,
                      enableHtml: true,
                      toastClass: "alert alert-danger alert-with-icon"
                    }
                  );
              }
            });
          }
        this.selectedFiles = undefined;
      }
    }
    download(url:string)
    {
      console.log(url);
    }
    
}
