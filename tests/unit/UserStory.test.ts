import { describe, test, expect, beforeEach } from 'vitest';
import { State, UserStory } from '../../src/UserStory';
import { MockAPI } from '../../src/MockAPI';

describe('UserStory', () => {
    let userStory: UserStory;
    
    beforeEach(() => {
        userStory = new UserStory('1');
    });

    test('should initialize with given id', () => {
        expect(userStory.id).toBe('1');
    });

    test('should get and set tag', () => {
        userStory.tag = 'feature';
        expect(userStory.tag).toBe('feature');
    });

    test('should get and set description', () => {
        userStory.description = 'This is a user story';
        expect(userStory.description).toBe('This is a user story');
    });

    test('should get state', () => {
        expect(userStory.state).toBe(undefined); 
    });

    test('should get verified', () => {
        expect(userStory.verified).toBe(undefined); 
    });

    test('should correctly fetch fata for a new EpicStory', async () => {
        await userStory.fetchData(new MockAPI());

        expect(userStory.id).toBe('1');
        expect(userStory.tag).toBe('user1');
        expect(userStory.description).toBe("Description for user 1");
        expect(userStory.state).toBe(State.TO_DO);
        expect(userStory.verified).toBe(true);
    })

});
