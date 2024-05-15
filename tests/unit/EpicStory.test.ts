import { describe, test , expect, beforeEach } from 'vitest';
import { EpicStory } from '../../src/EpicStory';
import { MockAPI } from '../../src/MockAPI';

describe('EpicStory', () => {

    test('should set the id correctly through the constructor and should return the correct id using the getter', () => {
        const id = '123';
        const story = new EpicStory(id);
        expect(story.id).toBe(id);
    })

    test('should return undefined for descrizione if not set', () => {
        const story = new EpicStory('123');
        expect(story.descrizione).toBeUndefined();
    })

    test('should set any descrizione correctly', () => {
        const story = new EpicStory('123');
        const descrizione = 'This is a new Epic Story';
        story.descrizione = descrizione;
        expect(story.descrizione).toBe(descrizione);
    })

    test('should correctly fetch fata for a new EpicStory', async () => {
        let story = new EpicStory('1');
        await story.fetchData(new MockAPI());

        expect(story.id).toBe('1');
        expect(story.descrizione).toBe("Epic Story 1");
    })
});