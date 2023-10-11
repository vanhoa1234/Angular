// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


export const environment = {
  production: false,
  apiUrl: 'https://localhost:44377',
  template:
  {
    taksDetail:"TaskDetail.component.html",
    ReviewDocument:"../../form/ReviewDocument.component.html"
  },
  endpoint:
  {
    internal:
    {
     baseUrl : 'http://192.168.0.71:8093/api/v1/bpm/',
     searchCustomerPath:'customer/search',
     getCollateralpath:'customer/collateral',
     updateCustomerPath:'',
     saveProcessPath:'process/create',
     approPath:'process/ApproveOrReject',
     processDetailPath:'process/detail',
     updateProcessTaskId:'process/update-taskId-ById',
     detailProcessTaskId:'process/getDetail-ByTaskId',
     getAllProcess:'process/all'

    },
    camundata:
    {
      baseUrl : 'http://192.168.0.71:8094/',
      completeTaskPath:'api/v1/camunda/task/complete-usertask',
      startProcessPath:'api/v1/camunda/process/start',
      getTaskPath:'api/v1/camunda/task/all?taskState=CREATED',
      getTaskDetailPath:'api/v1/camunda/task/',
      getTaskByUserPath:'api/v1/camunda/task/user',
      deployProcessPath:'api/v1/camunda/process/deploy'
    },
    ecmurl:
    {
      baseUrl:'http://192.168.0.71:8092/',
 uploadFile:'api/v1/ecm-filenet/create-document'
    }

  }

};
