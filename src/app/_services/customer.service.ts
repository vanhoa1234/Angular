import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ContentCustomer } from 'app/schemas/CustomerResponse';
import { TaskInfo } from 'app/schemas/Task';

@Injectable({ providedIn: 'root' })
export class CustomerService {
   private customerSubject:  BehaviorSubject<ContentCustomer | null>;
   public customer:Observable<ContentCustomer | null>;
   private taskInfoSubject: BehaviorSubject<TaskInfo | null>;
   public taskInfo:Observable<TaskInfo | null>;
  constructor(
  ) 
  {
    this.customerSubject = new BehaviorSubject(new ContentCustomer());
    this.taskInfoSubject = new BehaviorSubject(new TaskInfo());
    this.customer = this.customerSubject.asObservable();
    this.taskInfo = this.taskInfoSubject.asObservable();
  }

  changeCustomer(customer:ContentCustomer)
  {
    this.customerSubject.next(customer);
  }
  clearData()
  {
    this.customerSubject.next(null);
  }
  changeTask(taskInfo:TaskInfo)
  {
    this.taskInfoSubject.next(taskInfo);
  }
  
}
