import { Routes } from '@angular/router';

import { StartProcessComponent } from 'app/pages/Process/StartProcess.Component';
import { LoginComponent } from 'app/pages/user/login.component';
import { TaskDetailComponent } from '../../pages/Task/TaskDetail.component';
import { TaskListComponent } from '../../pages/Task/TaskList.component';
import { CustomerComponent } from '../../pages/customer/customer.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { DefaultComponent } from '../../pages/form/default.component';
import { FormComponent } from '../../pages/form/form.component';
import { Form1Component } from '../../pages/form/form1.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { UserComponent } from '../../pages/user/user.component';
import { listProcessComponent } from '../../pages/Process/listProcess.component';
import { ProcessDetailComponent } from '../../pages/Process/processDetail.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'login',           component: LoginComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'customer',       component: CustomerComponent },
    { path: 'taskDetail/:taskId',     component:TaskDetailComponent },
    { path: 'taskList',       component: TaskListComponent },
    { path: 'startProcess/:processId', component:StartProcessComponent},
    { path: 'default',        component: DefaultComponent },
    { path: 'form',        component: FormComponent },
    { path: 'form1',        component: Form1Component },
    { path: 'listProcess',        component: listProcessComponent },
    { path: 'processDetail/:processId',        component: ProcessDetailComponent }
];
