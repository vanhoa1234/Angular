import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UploadFileRequest, UploadFileResponse } from './schemas/AttachFile';
import { CollateralRequest, CollateralResponse } from './schemas/Collateral';
import { CompleteTaskRequest, CompleteTaskResponse } from './schemas/CompleteTask';
import { CustomerResponse } from './schemas/CustomerResponse';
import { ApprovalProcessRequest, ApprovalProcessResponse, ProcessResponse, SaveProcessRequest, SaveProcessResponse, StartProcessRequest, StartProcessResponse, UpdateProcessTaskRequest } from './schemas/Process';
import { ProcessListResponse } from './schemas/ProcessResponse';
import { SearchCustomerRequest } from './schemas/SearchCustomerRequest';
import { TaskInfoResponse, TaskResponse } from './schemas/Task';
import { LoginRequest, LoginResponse } from './schemas/User';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

interface RouteInfo {
  path: string;
  formKey: string;
}

const ROUTES: RouteInfo[] = [
  { path: '/form',                formKey: 'camunda-forms:bpmn:UserTaskForm_3gh8dd3' },
  { path: '/form1',               formKey: 'camunda-forms:bpmn:userTaskForm_2qfpvhk'}
];


@Injectable()
export class CamundaRestService {
  private camundaUrl = environment.endpoint.camundata;
  private internalUrl =environment.endpoint.internal;
  private ecmUrl =environment.endpoint.ecmurl;

  constructor(private http: HttpClient) {

  }

  getTasks(): Observable<TaskResponse> {
    const endpoint = `${this.camundaUrl.baseUrl}${this.camundaUrl.getTaskByUserPath}`;
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`fetched list tasks by user`)),
      catchError(this.handleError('get Tasks List failed', []))
    );
  }
  getTaskInfo(taskId:string): Observable<TaskInfoResponse> {
    const endpoint = `${this.camundaUrl.baseUrl}${this.camundaUrl.getTaskDetailPath}${taskId}`;
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`fetched tasks infomation`)),
      catchError(this.handleError('get tasks infomation failed', []))
    );
  }

  getAllProcess(): Observable<ProcessListResponse> {
    const endpoint = `${this.internalUrl.baseUrl}${this.internalUrl.getAllProcess}`;
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`fetched list process`)),
      catchError(this.handleError('get process infomation failed', []))
    );
  }

  getCustomer(req: SearchCustomerRequest): Observable<CustomerResponse> {
    const endpoint = `${this.internalUrl.baseUrl}${this.internalUrl.searchCustomerPath}`;
    let body = JSON.stringify(req);
    return this.http.post<any>(endpoint,body,httpOptions).pipe(
      tap(form => this.log(`fetched customer tasks`)),
      catchError(this.handleError('get customer', []))
    );
  }
 // get list 
  getCollaterals(req: CollateralRequest): Observable<CollateralResponse> {
    const endpoint = `${this.internalUrl.baseUrl}${this.internalUrl.getCollateralpath}`;
    let body = JSON.stringify(req);
    return this.http.post<any>(endpoint,body,httpOptions).pipe(
      tap(form => this.log(`fetched list collateral`)),
      catchError(this.handleError('collateral', []))
    );
  }
  // Start Process
  startProcess(req:StartProcessRequest): Observable<StartProcessResponse> {
    const endpoint = `${this.camundaUrl.baseUrl}${this.camundaUrl.startProcessPath}`;
    let body = JSON.stringify(req);
    return this.http.post<any>(endpoint,body,httpOptions).pipe(
      tap(form => this.log(`fetched process response`)),
      catchError(this.handleError('process', []))
    );
  }
  //Complete Task
  completeTask(req:CompleteTaskRequest): Observable<CompleteTaskResponse> {
    const endpoint = `${this.camundaUrl.baseUrl}${this.camundaUrl.completeTaskPath}`;
    let body = JSON.stringify(req);
    return this.http.post<any>(endpoint,body,httpOptions).pipe(
      tap(form => this.log(`fetched complete task response`)),
      catchError(this.handleError('complete task', []))
    );
  }
  // Save customer
  saveProcess(req:SaveProcessRequest): Observable<SaveProcessResponse> {
    const endpoint = `${this.internalUrl.baseUrl}${this.internalUrl.saveProcessPath}`;
    let body = JSON.stringify(req);
    return this.http.post<any>(endpoint,body,httpOptions).pipe(
      tap(form => this.log(`fetched save process`)),
      catchError(this.handleError('process task', []))
    );
  }
// Upload file to ECM
uploadFile(req:UploadFileRequest): Observable<UploadFileResponse> {
  const endpoint = `${this.ecmUrl.baseUrl}${this.ecmUrl.uploadFile}`;
  let body = JSON.stringify(req);
  return this.http.post<any>(endpoint,body,httpOptions).pipe(
    tap(form => this.log(`fetched process response`)),
    catchError(this.handleError('process', []))
  );
}
// Login
Login(req:LoginRequest): Observable<LoginResponse> {
  const endpoint = `http://192.168.0.71:8094/api/v1/camunda/login`;
  let body = JSON.stringify(req);
  return this.http.post<any>(endpoint,body,httpOptions).pipe(
    tap(form => this.log(`fetched login response`)),
    catchError(this.handleError('login', []))
  );
}
  getTaskById(taskId: string):Observable<TaskResponse> {
    const endpoint = `${this.camundaUrl}${taskId}`;
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`fetched list tasks`)),
      catchError(this.handleError('getLstTasks', []))
    );
  }
  ApprovalInputProcess(req:ApprovalProcessRequest):Observable<ApprovalProcessResponse>
  {
    const endpoint = `${this.internalUrl.baseUrl}${this.internalUrl.approPath}`;
    let body = JSON.stringify(req);
    return this.http.post<any>(endpoint,body,httpOptions).pipe(
      tap(form => this.log(`fetched ApprovalProcess response`)),
      catchError(this.handleError('ApprovalProcess', []))
    );
  }
  getProcess(id:number)
  {
    const endpoint = `${this.internalUrl.baseUrl}${this.internalUrl.processDetailPath}`;
    let body = JSON.stringify({"id":id});
    return this.http.post<any>(endpoint,body,httpOptions).pipe(
      tap(form => this.log(`fetched ApprovalProcess response`)),
      catchError(this.handleError('ApprovalProcess', []))
    );
  }
  getProcessByTask(taskId:string):Observable<ProcessResponse>
  {
    const endpoint = `${this.internalUrl.baseUrl}${this.internalUrl.detailProcessTaskId}`;
    let body = JSON.stringify({"taskId":taskId});
    return this.http.post<any>(endpoint,body,httpOptions).pipe(
      tap(form => this.log(`fetched ApprovalProcess response`)),
      catchError(this.handleError('ApprovalProcess', []))
    );
  }
  updateProcess(processId:number,taskId:string)
  {
    let request = new UpdateProcessTaskRequest();
    request.id = processId;
    request.taskId = taskId;
    const endpoint = `${this.internalUrl.baseUrl}${this.internalUrl.updateProcessTaskId}`;
    let body = JSON.stringify(request);
    return this.http.post<any>(endpoint,body,httpOptions).pipe(
      tap(form => this.log(`fetched Update process TaskId response`)),
      catchError(this.handleError('Update process', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
