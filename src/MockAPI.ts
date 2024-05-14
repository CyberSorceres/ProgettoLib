import { API_interface } from "./API_interface";
import { EpicData, EpicStory } from "./EpicStory";
import { ProjectData } from "./Progetto";

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
        console.log('mockAPi get epicstory');
        const mockEpic: EpicData | undefined = mockEpicStories.find(epic => epic.id === myId);
        
        if (mockEpic) {
          return Promise.resolve({
            id: mockEpic.id,
            descrizione: mockEpic.descrizione
          }) as Promise<EpicData | null>
        } else {
          return Promise.resolve(null);
        }
      }
}

const mockProjects: ProjectData[] = [
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

  const mockEpicStories: EpicData[] = [
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