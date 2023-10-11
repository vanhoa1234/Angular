import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
//import { FileUploadComponent } from './_components/uploadfile.component';
import { ErrorInterceptor, JwtInterceptor } from './_helpers';
import { CamundaRestService } from './camunda-rest.service';
import { GreetingSelectorComponent } from './greeting-selector.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginLayoutComponent } from './layouts/admin-layout/login-layout.component';
import { TaskInfoModule } from './pages/Task/TaskInfo.module';
@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginLayoutComponent,
    GreetingSelectorComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    TaskInfoModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CamundaRestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
