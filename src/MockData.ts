import { EpicData } from "./EpicStory";
import { ProjectData } from "./Progetto";
import { UserData } from "./UserStory";
import { State } from "./UserStory";

export const mockProjects: ProjectData[] = [
  {
    id: "1",
    name: "Project A",
    isValidated: true,
    epicStories: ["1", "2", "3"] // Array of EpicStory IDs
  },
  {
    id: "2",
    name: "Project B",
    isValidated: false,
    epicStories: ["4", "5"] // Array of EpicStory IDs
  }
];

export   const mockEpicStories: EpicData[] = [
  {
    id: "1",
    descrizione: "Epic Story 1",
    userStories: ["1", "2", "3"]
  },
  {
    id: "2",
    descrizione: "Epic Story 2",
    userStories: ["4", "5", "6", "7"]
  },
  {
      id: "3",
      descrizione: "Epic Story 3",
      userStories: ["8", "9"]
    }
];

export const mockUserStories: UserData[] = [
  {
    id: "1",
    tag: "user1",
    description: "Description for user 1",
    state: State.TO_DO,
    verified: true
  },
  {
    id: "2",
    tag: "user2",
    description: "Description for user 2",
    state: State.IN_PROGRESS,
    verified: false
  },
  {
    id: "3",
    tag: "user3",
    description: "Description for user 3",
    state: State.DONE,
    verified: true
  },
  {
    id: "4",
    tag: "user4",
    description: "Description for user 4",
    state: State.TO_DO,
    verified: true
  },
  {
    id: "5",
    tag: "user5",
    description: "Description for user 5",
    state: State.IN_PROGRESS,
    verified: false
  },
  {
    id: "6",
    tag: "user6",
    description: "Description for user 6",
    state: State.DONE,
    verified: true
  },
  {
    id: "7",
    tag: "user7",
    description: "Description for user 7",
    state: State.TO_DO,
    verified: true
  },
  {
    id: "8",
    tag: "user8",
    description: "Description for user 8",
    state: State.IN_PROGRESS,
    verified: false
  },
  {
    id: "9",
    tag: "user9",
    description: "Description for user 9",
    state: State.DONE,
    verified: true
  }
];
