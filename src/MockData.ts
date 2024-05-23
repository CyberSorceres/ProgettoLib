import { EpicStory } from "./EpicStory";
import { AI, Progetto } from "./Progetto";
import { Test } from "./Test";
import { State, UserStory } from "./UserStory"; 
export const exampleProjects : Progetto[] = [new Progetto('1', 'Project A', true, ['1'], AI.Bedrock), new Progetto('2', 'Project B', false, ['2', '3'], AI.ChatGPT)]; 
export const exampleEpicStories = [new EpicStory('1', 'Epic Story 1', ['1', '2', '3']), new EpicStory('2', 'Epic Story 2', ['4', '5', '6', '7']), new EpicStory('3', 'Epic Story 3', ['8', '9'])];
export const exampleUserStories = [new UserStory('1', 'user1', 'Description for user 1', State.TO_DO, true, undefined), new UserStory('2', 'user2', 'Description for user 2', State.IN_PROGRESS, false, undefined), new UserStory('3', 'user3', 'Description for user 3', State.DONE, true, undefined), new UserStory('4', 'user4', 'Description for user 4', State.TO_DO, true, undefined), new UserStory('5', 'user5', 'Description for user 5', State.IN_PROGRESS, false, undefined), new UserStory('6', 'user6', 'Description for user 6', State.DONE, true, undefined), new UserStory('7', 'user7', 'Description for user 7', State.TO_DO, true, undefined), new UserStory('8', 'user8', 'Description for user 8', State.IN_PROGRESS, false, undefined), new UserStory('9', 'user9', 'Description for user 9', State.DONE, true, undefined)];

