import { describe, test, expect, vi, afterEach } from 'vitest';
import { API } from '../../src/API';

describe('API', () => {
    const api = new API();

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('getProgetto', () => {
        test('should return the project with the specified id', async () => {
            const mockResponse = [
                { id: '1', name: 'Project 1' },
                { id: '2', name: 'Project 2' }
            ];
            vi.spyOn(global, 'fetch').mockResolvedValue({
                ok: true,
                json: async () => mockResponse,
            } as Response);

            const project = await api.getProgetto('1');
            expect(project).toEqual({ id: '1', name: 'Project 1' });
        });

        test('should throw an error if the project is not found', async () => {
            const mockResponse = [
                { id: '1', name: 'Project 1' }
            ];
            vi.spyOn(global, 'fetch').mockResolvedValue({
                ok: true,
                json: async () => mockResponse,
            } as Response);

            await expect(api.getProgetto('2')).rejects.toThrow('Project with id 2 not found');
        });

        test('should throw an error if the fetch fails', async () => {
            vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

            await expect(api.getProgetto('1')).rejects.toThrow('Failed to fetch data from API: Network error');
        });
    });

    describe('getEpicStory', () => {
        test('should return the epic story with the specified id', async () => {
            const mockResponse = [
                { id: '1', title: 'Epic Story 1' },
                { id: '2', title: 'Epic Story 2' }
            ];
            vi.spyOn(global, 'fetch').mockResolvedValue({
                ok: true,
                json: async () => mockResponse,
            } as Response);

            const epicStory = await api.getEpicStory('1');
            expect(epicStory).toEqual({ id: '1', title: 'Epic Story 1' });
        });

        test('should throw an error if the epic story is not found', async () => {
                const mockResponse = [
                    { id: '1', title: 'Epic Story 1' }
                ];
        
                vi.spyOn(global, 'fetch').mockResolvedValue({
                    ok: true,
                    json: async () => mockResponse,
                } as Response);
        
                await expect(api.getEpicStory('2')).rejects.toThrow('Failed to fetch data from API: Epic story with that id not found');
            });

        test('should throw an error if the fetch fails', async () => {
            vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

            await expect(api.getEpicStory('1')).rejects.toThrow('Failed to fetch data from API');
        });
    });

    describe('getUserStory', () => {
        test('should return the user story with the specified id', async () => {
            const mockResponse = [
                { id: '1', description: 'User Story 1' },
                { id: '2', description: 'User Story 2' }
            ];
            vi.spyOn(global, 'fetch').mockResolvedValue({
                ok: true,
                json: async () => mockResponse,
            } as Response);

            const userStory = await api.getUserStory('1');
            expect(userStory).toEqual({ id: '1', description: 'User Story 1' });
        });

        test('should throw an error if the user story is not found', async () => {
            const mockResponse = [
                { id: '1', description: 'User Story 1' }
            ];
            vi.spyOn(global, 'fetch').mockResolvedValue({
                ok: true,
                json: async () => mockResponse,
            } as Response);

            await expect(api.getUserStory('2')).rejects.toThrow('Failed to fetch data from API: User story with that id not found');
        });

        test('should throw an error if the fetch fails', async () => {
            vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

            await expect(api.getUserStory('1')).rejects.toThrow('Failed to fetch data from API');
        });

        const email = 'giulia@gmail.com';
        const password = 'password';

        test('bedrock', async () => {
            expect(await api.login(email,password)).toBe(true);
            const prompt = 'hello';
            const response = await api.bedrock(prompt);
            console.log(response);
        });
    });
    
    describe('promptToApi', () => {
        test('should return the response from the AI', async () => {
            const mockResponse = 'Response from AI';
            vi.spyOn(global, 'fetch').mockResolvedValue({
                ok: true,
                json: async () => mockResponse,
            } as Response);

            const response = await api.promptToAI('Prompt');
            expect(response).toEqual('Response from AI');
        });
    });
});

/*import { beforeAll } from 'vitest';
import { API } from '../../src/API';
import { Progetto } from '../../src/Progetto';
import { EpicStory } from '../../src/EpicStory';
import { UserStory } from '../../src/UserStory';

describe('API Integration Tests', () => {
    const api = new API();
    const testEmail = 'test@example.com';
    const testPassword = 'password';
    const testProjectId = 'testProjectId'; // sostituire con un id di progetto valido per testare
    const testEpicStoryId = 'testEpicStoryId'; //come sopra
    const testUserStoryId = 'testUserStoryId'; //come sopra
    const invalidId = 'invalidId';

    beforeAll(async () => {
        const loggedIn = await api.login(testEmail, testPassword);
        expect(loggedIn).toBe(true);
    });

    test('should fetch a project by ID', async () => {
        const project: Progetto = await api.getProgetto(testProjectId);
        expect(project).toBeDefined();
        expect(project.id).toBe(testProjectId);
    });

    test('should return error for invalid project ID', async () => {
        await expect(api.getProgetto(invalidId)).rejects.toThrow('Project with id invalidId not found');
    });

    test('should fetch an epic story by ID', async () => {
        const epicStory: EpicStory | null = await api.getEpicStory(testEpicStoryId);
        expect(epicStory).toBeDefined();
        expect(epicStory?.id).toBe(testEpicStoryId);
    });

    test('should return error for invalid epic story ID', async () => {
        await expect(api.getEpicStory(invalidId)).rejects.toThrow('Epic story with id invalidId not found');
    });

    test('should fetch a user story by ID', async () => {
        const userStory: UserStory | null = await api.getUserStory(testUserStoryId);
        expect(userStory).toBeDefined();
        expect(userStory?.id).toBe(testUserStoryId);
    });

    test('should return error for invalid user story ID', async () => {
        await expect(api.getUserStory(invalidId)).rejects.toThrow('User story with id invalidId not found');
    });

    test('should get a response from the AI model using bedrock', async () => {
        const prompt = 'Hello, how are you?';
        const response: string = await api.bedrock(prompt);
        expect(response).toBeDefined();
        expect(response).toContain('I am an AI'); // Adjust based on expected response
    });

    test('should return error for invalid login', async () => {
        const result = await api.login('invalid@example.com', 'wrongpassword');
        expect(result).toBe(false);
    });

    test('should handle authentication errors gracefully', async () => {
        api['token'] = 'invalidToken';
        await expect(api.getProgetto(testProjectId)).rejects.toThrow('HTTP error! Status: 401');
    });

    test('should return correct error for failed bedrock prompt', async () => {
        const invalidPrompt = ''; // Assuming an empty prompt is invalid
        await expect(api.bedrock(invalidPrompt)).rejects.toThrow('Failed to fetch data from API: AI could not generate a response');
    });
});*/
