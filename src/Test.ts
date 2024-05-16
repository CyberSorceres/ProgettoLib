import { API_interface } from "./API_interface";

export class Test{
    private UScode : string;
    private testCode: string;
    
    constructor(code: string) {
        this.UScode = code;
    }
    
    public generateUnitTest(api: API_interface): Response{
        const prompt = 'promt_text';
        
        api.promptToAI(prompt);

        return new Response(null);//todo
    }

    public getUScode(): string {
        return this.UScode;
    }

    public setUScode(code: string): void {
        this.UScode = code;
    }

    public getTestCode(): string {
        return this.testCode;
    }

    public setTestCode(code: string): void {
        this.testCode = code;
    }

}
