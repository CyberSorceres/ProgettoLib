import { describe, expect, beforeEach, test} from 'vitest';
import { AI, Progetto } from '../../src/Progetto';
import { MockAPI } from '../../src/MockAPI';
import { API_interface } from '../../src/API_interface';

describe('Progetto', () => {
    let initializedProgetto: Progetto;
    let api: API_interface;

    beforeEach(async () => {
        api = new MockAPI;
        const pro = await api.getProgetto('1');
        if(pro != null){
            initializedProgetto = pro;
        }
    });

    test('should correctly construct a new project given the Id', async () => {
        expect(initializedProgetto.id).toBe('1');
        expect(initializedProgetto.isValidated).toBe(true);
        expect(initializedProgetto.name).toBe('Project A');
        expect(initializedProgetto.epicStoriesIds).toEqual(['1']);
        expect(initializedProgetto.ai).toBe(AI.Bedrock);
    });
}); 