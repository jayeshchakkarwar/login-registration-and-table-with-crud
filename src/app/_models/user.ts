export class User {
    id?: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
}

export class PayeeObj {
    PayeeId: number;
    FirstName: string;
    LastName: string;
    Amount: string;
    AccountNumber: string;
    AmountType: string;
    Remark: string;

    constructor() {
        this.PayeeId = 0;
        this.FirstName = "";
        this.LastName = "";
        this.Amount = "";
        this.AccountNumber = "";
        this.AmountType = "";
        this.Remark = "";
    }
}