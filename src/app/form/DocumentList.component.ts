import { Component, OnInit } from '@angular/core';
import { CamundaRestService } from 'app/camunda-rest.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './DocumentList.component.html',
  styleUrls: ['./DocumentList.component.css']
})
export class DocumentListComponent implements OnInit {
  constructor(private camundaService: CamundaRestService) {}
  ngOnInit(): void {
    
  }
  
  
}