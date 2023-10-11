import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'app/pages/user/login.component';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule
    ]
})

export class LoginLayoutModule {}
