import { describe, expect, beforeEach, test} from 'vitest';
import { Progetto } from '../../src/Progetto';
import { MockAPI } from '../../src/MockAPI';
import { mockEpicStories } from '../../src/MockData';
import { EpicStory } from '../../src/EpicStory';


describe('Progetto', () => {
    let progetto: Progetto;

    beforeEach(() => {
        progetto = new Progetto('1');
    });

    test('should initialize with given id', () => {
        expect(progetto.id).toBe('1');
    });

    test('should initialize with undefined name', () => {
        expect(progetto.name).toBeUndefined();
    });

    test('should initialize with undefined isValidated', () => {
        expect(progetto.isValidated).toBeUndefined();
    });

    test('should correctly fetch data for a new project', async () => {
        await progetto.fetchData(new MockAPI());

        expect(progetto.id).toBe('1');
        expect(progetto.isValidated).toBe(true);
        expect(progetto.name).toBe('Project A');
    });

}); 