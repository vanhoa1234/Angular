export class CollateralResponse
{
    status!:boolean;
    content!: CollateralInfo;
}
export class CollateralInfo
{
    collateralInfo:Collateral[];
}
export class Collateral
{
    cifNo!: string;
    name!:string;
    value!:string;
    contractNo!:string;
    type!:string;
    status!:string
}
export class CollateralRequest
{
    cifNo!:string;
}

