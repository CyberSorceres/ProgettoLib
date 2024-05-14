import { describe, it, expect, beforeEach, test} from 'vitest';
import { Progetto } from '../../src/Progetto';
import { ProjectData } from '../../src/Progetto';
import { MockAPI } from '../../src/MockAPI';

describe('Progetto', () => {
    let progetto: Progetto;

    it('should correctly construct a new project', async () => {
        progetto = new Progetto('1');
        await progetto.fetchData(new MockAPI());

        expect(progetto.id).toBe('1');
        expect(progetto.isValidated).toBe(true);
        expect(progetto.name).toBe('Project A');
    });

});