import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { CustomerComponent } from '../../pages/customer/customer.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { UserComponent } from '../../pages/user/user.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadComponent } from 'app/_components/uploadfile.component';
import { AddDocuementComponent } from 'app/form/AddDocument.component';
import { gdvComponent } from 'app/pages/Process/gdv.component';
import { TaskDetailComponent } from 'app/pages/Task/TaskDetail.component';
import { ReviewDocuementComponent } from '../../form/ReviewDocument.component';
import { StartProcessComponent } from '../../pages/Process/StartProcess.Component';
import { TaskInfoModule } from "../../pages/Task/TaskInfo.module";
import { TaskListComponent } from '../../pages/Task/TaskList.component';
import { listProcessComponent } from '../../pages/Process/listProcess.component';
import { ProcessDetailComponent } from '../../pages/Process/processDetail.component';
@NgModule({
    declarations: [
        DashboardComponent,
        UserComponent,
        TableComponent,
        UpgradeComponent,
        TypographyComponent,
        IconsComponent,
        MapsComponent,
        NotificationsComponent,
        CustomerComponent,
        TaskListComponent,
        StartProcessComponent,
        TaskDetailComponent,
        ReviewDocuementComponent,
        FileUploadComponent,
        AddDocuementComponent,
        gdvComponent,
        listProcessComponent,
        ProcessDetailComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        NgbModule,
        TaskInfoModule
    ]
})

export class AdminLayoutModule {}
