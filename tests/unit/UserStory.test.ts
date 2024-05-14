import { describe, test, expect } from 'vitest';
import { UserStory } from '../../src/UserStory'; 

describe('UserStory', () => {
    test('should create an instance with the provided id', () => {
        const userStory = new UserStory('123');
        expect(userStory.id).toBe('123');
    });

    test('should set and get the tag', () => {
        const userStory = new UserStory('123');
        userStory.tag = 'feature';
        expect(userStory.tag).toBe('feature');
    });

    test('should set and get the description', () => {
        const userStory = new UserStory('123');
        userStory.description = 'This is a user story description';
        expect(userStory.description).toBe('This is a user story description');
    });

    test('should return undefined for tag and description if not set', () => {
        const userStory = new UserStory('123');
        expect(userStory.tag).toBeUndefined();
        expect(userStory.description).toBeUndefined();
    });
});
