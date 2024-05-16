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
}