export interface API_interface {

    getProgetto(id: string): Promise<any>;
    //getEpic
    //...
    //bedrock(prompt: string): promise;
    //vhatgpt

    callToAPI(eapiEndpoint: string): Promise<any>;
}