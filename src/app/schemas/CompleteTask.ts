export class CompleteTaskResponse
{
    status!: boolean;
    content!:taskInfo;
    message!:string;
}
export class CompleteTaskRequest
{
    taskId!:string;
    formData!: formData;
}
export class formData
{
    approval!:boolean;
}
export class taskInfo
{
    id!:string;
    name!:string;
    taskDefinitionId!:string;
    processName!:string;
    taskState!:string
}
