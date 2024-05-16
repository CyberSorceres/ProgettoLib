import { describe, test, expect} from 'vitest';
import { API } from '../../src/API';
import { UserStory } from '../../src/UserStory';

describe('API', () => {
    let user: UserStory|null;
    test('should fetch data from the API', async () => {
        const api = new API();
        await api.getUserStory('1');
    });
    
});
