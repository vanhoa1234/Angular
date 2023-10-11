export class AttachFile
{
    fileName!: string;
    contentType!:string;
    fileSize: number;
    fileContent:string;
}
export class UploadFileRequest
{
 cifNo!: string;
 code!: string;
 file!: string;
 userName!:string;
 contentType!: string;
}
export class UploadFileResponse
{
 status!: string
 content!: any
}