import { Component, Input } from '@angular/core';
@Component({
    selector: 'greeting',
    template: `<div [ngSwitch]="type">
      <hi *ngSwitchCase="'hi'" name="{{name}}"></hi>
      <hello *ngSwitchCase="'hello'" name="{{name}}"></hello>    
    </div>`
  })
  export class GreetingSelectorComponent  {
    @Input() type: string;
    @Input() name: string;
  }