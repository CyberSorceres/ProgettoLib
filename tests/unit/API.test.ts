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
});
