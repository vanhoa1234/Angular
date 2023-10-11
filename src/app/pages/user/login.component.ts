import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'app/_services';
import { CamundaRestService } from 'app/camunda-rest.service';
import { LoginRequest } from 'app/schemas/User';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'user-login',
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit{
   public username!:string;
   public password!:string;
    request!:LoginRequest;
    
    constructor(
        private toastr: ToastrService,
        private accountService:AccountService,
        private camundaRestService: CamundaRestService,
        private router:Router) 
    {
    }
    ngOnInit(){
       
    }
    login()
    {
        this.request= new LoginRequest();
        this.request.username=this.username;
        this.request.password =this.password;
        
this.accountService.login( this.request.username,this.request.password ).subscribe(
    res=>{
        if(res!=undefined && res.status)
        {
             this.router.navigate(['/taskList']);
        }
        else
        {
            this.toastr.info(
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Đăng nhập thất bại</span>',
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
