export declare class Takotsubo {
    private ENDPOINT;
    private fetchWrapper;
    fetchToken(email: string, passwd: string): Promise<any>;
    fetchData(token: string, accountNumber: string, startDate: string, endData: string): Promise<any>;
}
