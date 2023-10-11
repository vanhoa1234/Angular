import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskInfoComponent } from './TaskInfo.component';

@NgModule({
    imports: [ RouterModule, CommonModule, NgbModule ],
    declarations: [ TaskInfoComponent ],
    exports: [ TaskInfoComponent ]
})

export class TaskInfoModule {}
