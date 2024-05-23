import { describe, test, expect, beforeEach } from 'vitest';
import { State, UserStory } from '../../src/UserStory';
import { MockAPI } from '../../src/MockAPI';
import { API_interface } from '../../src/API_interface';

describe('UserStory', () => {
    let initializedUserStory: UserStory;
    let nonInitializedUserStory: UserStory;
    let api: API_interface;
    
    beforeEach(async () => {
        api = new MockAPI;
        const user = await api.getUserStory('1');
        if(user != null){
            initializedUserStory = user;
        }
        nonInitializedUserStory = new UserStory();
    });

    test('non initialized userStory should have all fields undefined', () => {
        expect(nonInitializedUserStory.id).toBeUndefined;
        expect(nonInitializedUserStory.tag).toBeUndefined;
        expect(nonInitializedUserStory.description).toBeUndefined;
        expect(nonInitializedUserStory.state).toBeUndefined;
        expect(nonInitializedUserStory.verified).toBeUndefined;
        expect(nonInitializedUserStory.test).toBeUndefined;
    })

    test('should correctly construct a new UserStory',  () => {

        expect(initializedUserStory.id).toBe('1');
        expect(initializedUserStory.tag).toBe('user1');
        expect(initializedUserStory.description).toBe("Description for user 1");
        expect(initializedUserStory.state).toBe(State.TO_DO);
        expect(initializedUserStory.verified).toBe(true);
        expect(initializedUserStory.test).toBe(undefined);
    })

});
