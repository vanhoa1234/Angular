export class CustomerResponse {
  status!: string;
  content!: ContentCustomer[];
}
export class ContentCustomer{
    cifNo?: string;
    name!: NameResponse;
    id!: IdResponse;
    gender!: string;
    birthDate!: Date;
    contactInfo!: contactInfoResponse;
    custType!: string;
    taxCode!: string;
    status!: string;
    createdDate!: Date;
  }
class NameResponse{
    shortName!: string;
    fullName!: string;
}
class IdResponse{
  idType!: string;
  idNo!: string;
  idIssueDate!: Date;
  idIssuePlace!: string;
}
class contactInfoResponse{
  addressInfo!: string;
  mobileNo!: string;
  emailAddress!: string;
}