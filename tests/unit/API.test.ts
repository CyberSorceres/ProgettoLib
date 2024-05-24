import { describe, test, expect, vi, afterEach, beforeEach, beforeAll } from 'vitest';
import { MockAPI } from '../../src/MockAPI'
import { EpicStory } from '../../src/EpicStory';
import { exampleProjects } from '../../src/MockData';
import { State, UserStory } from '../../src/UserStory';
import { API_interface } from '../../src/API_interface';
import { Test } from '../../src/Test';

describe('API', () => {
    let api: API_interface;
    const correctEmail = 'correctemail@gmail.com';
    const correctPassword = 'correctpassword';

    const incorrectEmail = 'incorrectemail@gmail.com';
    const incorrectPassword = 'incorrectpassword';
    

    beforeEach( () => {
        api = new MockAPI();

        api.register(correctEmail, correctPassword);
    });

    describe('login', () => {
        test('should login correctly with the right credentials', async () => {
            expect(await api.login(correctEmail, correctPassword)).toBe(true);
        });

        test('should not login with incorrect credentials', async () => {
            expect(await api.login(incorrectEmail, incorrectPassword)).toBe(false);
        });
    });


    describe('getProgetto', () => {
        test('should return the project with the specified id', async () => {

            const project = await api.getProgetto('1');
            expect(project).toEqual(exampleProjects.find(obj => obj.id === '1'));
        });

        test('should throw an error if the project is not found', () => {

            expect(() => api.getProgetto('99')).toThrow('Project with id 99 not found');
        });
    });

    describe('getEpicStory', () => {
        test('should return the epic story with the specified id', async () => {

            const epicStory = await api.getEpicStory('1', '1');
            expect(epicStory).toEqual(new EpicStory('1', 'Epic Story 1', ['1', '2', '3']));
        });

        test('should throw an error if the epic story is not found', () => {
                expect(() => api.getEpicStory('99', '1')).toThrow('Epic Story with id 99 not found');
            });
    });

    describe('getUserStory', () => {
        test('should return the user story with the specified id', async () => {

            const epicStory = await api.getUserStory('1', '1');
            expect(epicStory).toEqual(new UserStory('1', 'user1', 'Description for user 1', State.TO_DO, true, undefined));
        });

        test('should throw an error if the user story is not found', () => {
                expect(() => api.getUserStory('99', '1')).toThrow('User Story with id 99 not found');
            });
    });

});