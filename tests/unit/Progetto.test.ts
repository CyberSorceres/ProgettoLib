import { describe, expect, beforeEach, test} from 'vitest';
import { Progetto } from '../../src/Progetto';
import { MockAPI } from '../../src/MockAPI';


describe('Progetto', () => {
    let progetto: Progetto;

    beforeEach(() => {
        progetto = new Progetto('123');
    });

    test('should initialize with given id', () => {
        expect(progetto.id).toBe('123');
    });

    test('should initialize with undefined name', () => {
        expect(progetto.name).toBeUndefined();
    });

    test('should initialize with undefined isValidated', () => {
        expect(progetto.isValidated).toBeUndefined();
    });

    test('should correctly construct a new project', async () => {
        progetto = new Progetto('1');
        await progetto.fetchData(new MockAPI());

        expect(progetto.id).toBe('1');
        expect(progetto.isValidated).toBe(true);
        expect(progetto.name).toBe('Project A');
    });

}); 