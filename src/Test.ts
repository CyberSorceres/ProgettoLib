import { API_interface } from "./API_interface";
import { AI, Progetto } from "./Progetto";

export class Test{
    private _UScode : string;
    private _testCode: string;
    
    constructor(code: string) {
        this._UScode = code;
    }
    
    public async generateUnitTest(api: API_interface, progetto: Progetto): Promise<Boolean> {
        const prompt = 'TODO'; //TODO construct propt with code
        
        switch (progetto.ai) {
            case AI.Bedrock:
                const response = await api.bedrock(prompt);
                if(response){
                    this._testCode = response;
                    return true;
                }
                else{
                    return false;
                }
            case AI.ChatGPT:
                /*
                const response2 = await api.chatGPT(prompt);
                if(response){
                    this._testCode = response2;
                    return true;
                }
                else{
                    return false;
                }
                */ //TODO set when chatGPT is implemented

            default:
                return false;

        }
    }
    
    public get UScode(): string {
        return this._UScode;
    }

    public get testCode(): string {
        return this._testCode;
    }
}