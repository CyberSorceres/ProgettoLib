import { describe, expect, beforeEach, test} from 'vitest';
import { Progetto } from '../../src/Progetto';
import { MockAPI } from '../../src/MockAPI';
import { API_interface } from '../../src/API_interface';

describe('Progetto', () => {
    let initializedProgetto: Progetto;
    let nonInitializedProgetto: Progetto;
    let api: API_interface;

    beforeEach(async () => {
        api = new MockAPI;
        const pro = await api.getProgetto('1');
        if(pro != null){
            initializedProgetto = pro;
        }
        nonInitializedProgetto = new Progetto();
    });

    test('should initialize with undefined fields', () => {
        expect(nonInitializedProgetto.name).toBeUndefined();
        expect(nonInitializedProgetto.isValidated).toBeUndefined();
        expect(nonInitializedProgetto.epicStoriesIds).toBeUndefined();
    });

    test('should correctly construct a new project given the Id', async () => {
        const expectedIds: string[] = ['1'];

        expect(initializedProgetto.id).toBe('1');
        expect(initializedProgetto.isValidated).toBe(true);
        expect(initializedProgetto.name).toBe('Project A');
        expect(initializedProgetto.epicStoriesIds).toEqual(expectedIds);
    });
}); 