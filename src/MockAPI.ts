import { API_interface } from "./API_interface";
import { EpicData, EpicStory } from "./EpicStory";
import { mockProjects, mockEpicStories, mockUserStories } from "./MockData";
import { ProjectData } from "./Progetto";
import { UserData, UserStory} from "./UserStory"


export class MockAPI implements API_interface{

      async getProgetto(myId: string): Promise<ProjectData | null> {
        // Simulate fetching project data from a mock data source
        const mockProject: ProjectData | undefined = mockProjects.find(project => project.id === myId);
        
        if (mockProject) {
          return {
            id: mockProject.id,
            name: mockProject.name,
            isValidated: mockProject.isValidated,
            epicStories: mockProject.epicStories
          };
        } else {
          return null;
        }
      }

      getEpicStory(myId: string): Promise<EpicData | null> {
        const mockEpic: EpicData | undefined = mockEpicStories.find(epic => epic.id === myId);
        
        if (mockEpic) {
          return Promise.resolve({
            id: mockEpic.id,
            descrizione: mockEpic.descrizione,
            userStories: mockEpic.userStories
          }) as Promise<EpicData | null>
        } else {
          return Promise.resolve(null);
        }
      }
      getUserStory(myId: string): Promise<UserData | null> {
        const mockUser: UserData | undefined = mockUserStories.find(user => user.id === myId);
        
        if (mockUser) {
          return Promise.resolve({
            id: mockUser.id,
            tag: mockUser.tag,
            description: mockUser.description,
            state: mockUser.state,
            verified: mockUser.verified
          }) as Promise<UserData | null>
        } else {
          return Promise.resolve(null);
        }
      }

      public promptToAI(prompt: string): Promise<string> {
          return Promise.resolve(prompt);
      }
}