import { Component, Input, OnInit, Output } from '@angular/core';
import { FileUploadService } from 'app/_services/uploadfile.service';
import { CamundaRestService } from 'app/camunda-rest.service';
import { UploadFileRequest } from 'app/schemas/AttachFile';
import { ToastrService } from 'ngx-toastr';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class FileUploadComponent implements OnInit {
  @Input() customerInfo!:any;
  @Output() documentList!: any;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  base64Output!:string;
  fileInfos?: Observable<any>;
  req!: UploadFileRequest;

  constructor(private uploadService: FileUploadService,
    private toastr: ToastrService,
    private ecmServices: CamundaRestService) {}

  ngOnInit(): void {
    this.req = new UploadFileRequest();
    this.req.cifNo="0123456789";
    this.req.code="CODE";
    this.fileInfos = this.uploadService.getFiles();
    if(this.customerInfo)
    {
      console.log("Thông tin khách hàng:"+this.customerInfo);
    }
    
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    console.log("convert sssss");
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.base64Output = base64;
      console.log("Data base64:"+this.base64Output);
    });
  }
  
  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }
  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        this.req = new UploadFileRequest();
        this.req.cifNo=this.customerInfo;
        this.req.code=this.customerInfo;
        this.req.userName="demo";
        this.req.contentType ="application/xls";
        this.req.file=this.base64Output;
        this.ecmServices.uploadFile(this.req)
        .subscribe(response =>
          {
            if(response.status)
            {
              this.documentList.emit(this.req);
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
      //   this.uploadService.upload(this.currentFile).subscribe({
      //     next: (event: any) => {
      //       if (event.type === HttpEventType.UploadProgress) {
      //         this.progress = Math.round((100 * event.loaded) / event.total);
      //       } else if (event instanceof HttpResponse) {
      //         this.message = event.body.message;
      //         this.fileInfos = this.uploadService.getFiles();
      //       }
      //     },
      //     error: (err: any) => {
      //       console.log(err);
      //       this.progress = 0;

      //       if (err.error && err.error.message) {
      //         this.message = err.error.message;
      //       } else {
      //         this.message = 'Could not upload the file!';
      //       }

      //       this.currentFile = undefined;
      //     },
      //   });
      // }

      this.selectedFiles = undefined;
    }
  }
}