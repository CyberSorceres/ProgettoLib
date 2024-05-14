import { describe, it, expect, beforeEach } from 'vitest';
import { UserStory, State } from '../../src/UserStory';

describe('UserStory', () => {
    let userStory: UserStory;
    
    beforeEach(() => {
        userStory = new UserStory('1');
    });

    it('should initialize with given id', () => {
        expect(userStory.id).toBe('1');
    });

    it('should get and set tag', () => {
        userStory.tag = 'feature';
        expect(userStory.tag).toBe('feature');
    });

    it('should get and set description', () => {
        userStory.description = 'This is a user story';
        expect(userStory.description).toBe('This is a user story');
    });

    it('should get state', () => {
        expect(userStory.state).toBe(undefined); 
    });

    it('should get verified', () => {
        expect(userStory.verified).toBe(undefined); 
    });

});
