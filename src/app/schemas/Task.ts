export class TaskResponse {
  status!: boolean;
  content!: ContentTask[];
  message!:string;
  code!:string;
}
class ContentTask {
  id!: string;
  name!: string;
  processName!: string;
  taskState!: string;
  assignee!: string;
  processInstanceKey!: string;
  formKey!: string;
}
export class TaskInfoResponse {
  status!: boolean;
  content!: TaskInfo;
}
export class TaskInfo{
  id!: string;
  name!: string;
  taskDefinitionId!: string;
  processName!: string;
  creationDate!:string;
  completionDate!: string;
  assignee!: string;
  taskState!: string;
  isFirst!: string;
  formKey!: string;
  processDefinitionKey!:string;
  processInstanceKey!: string;
  dueDate!: string;
  followUpDate!: string;
  candidateGroups!: string;
  candidateUsers!: string;
}
