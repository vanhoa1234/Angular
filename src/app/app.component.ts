import { Component } from '@angular/core';
import { ContentCustomer } from './schemas/CustomerResponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  selectedCustomer: any;
  customer = new ContentCustomer();

  onSelectedCustomer(customer) {
    this.selectedCustomer = customer;
  }
}
