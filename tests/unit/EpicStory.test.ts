import { describe, test , expect, beforeEach } from 'vitest';
import { EpicStory } from '../../src/EpicStory';
import { MockAPI } from '../../src/MockAPI';
import { mockEpicStories, mockUserStories } from '../../src/MockData';
import { UserStory } from '../../src/UserStory';
import { API_interface } from '../../src/API_interface';
import { Progetto } from '../../src/Progetto';

describe('EpicStory', () => {

    let initializedEpic: EpicStory;
    let nonInitializedEpic: EpicStory;
    let api: API_interface;

    beforeEach(async () => {
        api = new MockAPI;
        const epic = await api.getEpicStory('1');
        if(epic != null){
            initializedEpic = epic;
        }
        nonInitializedEpic = new EpicStory();
    });

    test('non initialized EpicStory should have all fields undefined', () => {
        expect(nonInitializedEpic.id).toBeUndefined;
        expect(nonInitializedEpic.descrizione).toBeUndefined;
        expect(nonInitializedEpic.userStoriesIds).toBeUndefined;
    })

    test('should correctly construct a new EpicStory', async () => {  
        expect(initializedEpic.id).toBe('1');
        expect(initializedEpic.descrizione).toBe('Epic Story 1');
        expect(initializedEpic.userStoriesIds).toEqual(['1', '2', '3']);
    })
    
});