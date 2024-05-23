import { Test } from "./Test";
import { State } from "./UserStory"; 

// Define the ProjectData interface
export interface ProjectData {
	id: string;
	name: string;
	isValidated: boolean;
	epicStoriesIds: string[];
}
export interface EpicData {
	id: string;
	descrizione: string;
	userStoriesIds: string[];
}

export interface UserData {
  id: string;
  tag: string;
  description: string;
  state: State;
  verified: boolean;
  test: Test;
}

export const mockUserStories: UserData[] = [
  {
    id: "1",
    tag: "user1",
    description: "Description for user 1",
    state: State.TO_DO,
    verified: true,
    test: undefined
  },
  {
    id: "2",
    tag: "user2",
    description: "Description for user 2",
    state: State.IN_PROGRESS,
    verified: false,
    test: undefined
  },
  {
    id: "3",
    tag: "user3",
    description: "Description for user 3",
    state: State.DONE,
    verified: true,
    test: undefined
  },
  {
    id: "4",
    tag: "user4",
    description: "Description for user 4",
    state: State.TO_DO,
    verified: true,
    test: undefined
  },
  {
    id: "5",
    tag: "user5",
    description: "Description for user 5",
    state: State.IN_PROGRESS,
    verified: false,
    test: undefined
  },
  {
    id: "6",
    tag: "user6",
    description: "Description for user 6",
    state: State.DONE,
    verified: true,
    test: undefined
  },
  {
    id: "7",
    tag: "user7",
    description: "Description for user 7",
    state: State.TO_DO,
    verified: true,
    test: undefined
  },
  {
    id: "8",
    tag: "user8",
    description: "Description for user 8",
    state: State.IN_PROGRESS,
    verified: false,
    test: undefined
  },
  {
    id: "9",
    tag: "user9",
    description: "Description for user 9",
    state: State.DONE,
    verified: true,
    test: undefined
  }
];

export const mockEpicStories: EpicData[] = [
  {
    id: "1",
    descrizione: "Epic Story 1",
    userStoriesIds: ['1', '2', '3']
  },
  {
    id: "2",
    descrizione: "Epic Story 2",
    userStoriesIds: ['4', '5', '6', '7']
  },
  {
    id: "3",
    descrizione: "Epic Story 3",
    userStoriesIds: ['8', '9']
  }
];

export const mockProjects: ProjectData[] = [
  {
    id: "1",
    name: "Project A",
    isValidated: true,
    epicStoriesIds: ['1']
  },
  {
    id: "2",
    name: "Project B",
    isValidated: false,
    epicStoriesIds: ['2', '3']
  }
];