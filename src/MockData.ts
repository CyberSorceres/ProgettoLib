import { EpicData } from "./EpicStory";
import { ProjectData } from "./Progetto";
import { UserData } from "./UserStory";

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
    descrizione: "Epic Story 1"
  },
  {
    id: "2",
    descrizione: "Epic Story 2"
  },
  {
      id: "3",
      descrizione: "Epic Story 3"
    }
];

export const mockUserStories: UserData[] = [
  {
    id: "1",
    descrizione: "User Story 1"
  },
  {
    id: "2",
    descrizione: "User Story 2"
  },
  {
      id: "3",
      descrizione: "User Story 3"
    }
];
