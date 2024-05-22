import { API_interface } from "./API_interface";
import { EpicData, EpicStory } from "./EpicStory";
import { mockProjects, mockEpicStories, mockUserStories } from "./MockData";
import { Progetto, ProjectData } from "./Progetto";
import { UserData, UserStory} from "./UserStory"


export class MockAPI implements API_interface{

      async getProgetto(myId: string): Promise<Progetto | null> {
        // Simulate fetching project data from a mock data source
        const mockProject: ProjectData | undefined = mockProjects.find(project => project.id === myId);
        
          return Promise.resolve(new Progetto('0', mockProject));
      }

      getEpicStory(myId: string): Promise<EpicStory | null> {
        const mockEpic: EpicData | undefined = mockEpicStories.find(epic => epic.id === myId);
        
        return Promise.resolve(new EpicStory('0', mockEpic));
      }
      getUserStory(myId: string): Promise<UserStory | null> {
        const mockUser: UserData | undefined = mockUserStories.find(user => user.id === myId);

          return Promise.resolve(new UserStory('0', mockUser));
      }

      public promptToAI(prompt: string): Promise<string> {
          return Promise.resolve(prompt);
      }

      public bedrock(prompt: string): Promise<string> {
          return Promise.resolve('TODO');
      }

      login(email: string, password: string): Promise<boolean> {
          return Promise.resolve(true);
      }
}