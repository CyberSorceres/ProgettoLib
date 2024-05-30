import { EpicStory } from "./EpicStory";
import { Progetto } from "./Progetto";
import { LoginState, API_interface } from './API_interface'
import { UserStory } from "./UserStory";

export class API implements API_interface {
    private token: string;
    private session: string;
  
  private static baseUrl: string =
  "https://rzjihxrx1e.execute-api.us-east-1.amazonaws.com/dev";
  
  private jsonToProject(projectJson: object): Progetto {
    return new Progetto(
      projectJson.id,
      projectJson.name,
      projectJson.validated,
      projectJson.epicStories,
	projectJson.ai,
	projectJson.cliente,
	proejctJson.date,
    );
  }
  
  //LOGIN
  async login(email: string, password: string): Promise<LoginState> {
    const endpoint = `${API.baseUrl}/login`;
    try {
      const response = await fetch(endpoint, {
        method: "post",
        body: JSON.stringify({ email, password }),
      });
	if (response.ok) {
	    const responseObject = (await response.json()) as any;
	    if (responseObject?.AuthenticationResult?.IdToken) {
		this.token = responseObject?.AuthenticationResult?.IdToken;
		return LoginState.LOGGED_IN;
	    } else {
		this.session = responseObject.Session;
		return LoginState.MUST_SIGN_UP;
	    }
      } else {
        return LoginState.FAILED;
      }
    } catch (error) {
      throw new Error(`Failed to fetch data from API: ${error.message}`);
    }
  }

    async changePassword(email: string, password: string): Promise<boolean> {
	const response = await (await fetch(`${API.baseUrl}/change_password`, {
	    method: 'POST',
	    body: JSON.stringify({
		email, password, session: this.session,
	    })
	})).json()
	this.token = response?.AuthenticationResult?.IdToken;
	return !!this.token;
    }

  public loggedIn(): boolean {
    if (this.token === undefined) {
      return false;
    }
    else {
      return true;
    }
  }
  async register(email: string, password: string): Promise<boolean> {
    const endpoint = `${API.baseUrl}/register`;
    try {
      const response = await fetch(endpoint, {
        method: "post",
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(`Failed to fetch data from API: ${error.message}`);
    }
  }
  
  //GET
  async getProgettiOfUser(): Promise<Progetto[]> {
    const endpoint = `${API.baseUrl}/getProgetti`;
    try {
      const response = await this.authenticatedFetch(endpoint);
      if (response.ok) {
        const progetti = await response.json();
        return progetti.map((p) => this.jsonToProject(p));
      } else {
        return undefined;
      }
    } catch (error) {
      throw new Error(`Failed to fetch data from API: ${error.message}`);
    }
  }
  
  async getUserStoriesAssignedToUser(): Promise<UserStory[]> {
    //TODO implement
    const endpoint = `${API.baseUrl}/getUserStoriesAssignedToUser?`; //TODO Add lambda + API in backend
    try {
      const response = await this.authenticatedFetch(endpoint);
      if (response.ok) {
        const userStories: UserStory[] = [];
        for (const story of await response.json()) {
          userStories.push(
            new UserStory(
              story.id,
              story.tag,
              story.description,
              story.state,
              story.verified,
              story.test,
            ),
          );
        }
        return userStories;
      } else {
        throw new Error("Failed to fetch user stories assigned to the user.");
      }
    } catch (error) {
      throw new Error(`Failed to fetch data from API: ${error.message}`);
    }
  }
  
  async getProgetto(id: string): Promise<Progetto> {
    //FIXME
    try {
      const endpoint = `${API.baseUrl}/getProgetto?projectId=${id}`;
      const response = await this.authenticatedFetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return this.jsonToProject(await response.json());
    } catch (error) {
      throw new Error(`Failed to fetch data from API: ${error.message}`);
    }
  }
  
  async getEpicStory(epicId: string, projectId: string): Promise<EpicStory> {
    try {
      const endpoint = `${API.baseUrl}/getEpicStory?projectId=${projectId}&epicStoryId=${epicId}`;
      const response = await this.authenticatedFetch(endpoint);
      if (response.ok) {
        const epic = await response.json();
        return new EpicStory(epic._id, epic.description, epic.userStories);
      } else {
        return undefined;
      }
    } catch (error) {
      throw new Error(
        "Failed to fetch data from API: Epic story with that id not found",
      );
    }
  }
  
  async getUserStory(id: string): Promise<UserStory> {
    try {
      const endpoint =
      "https://rzjihxrx1e.execute-api.us-east-1.amazonaws.com/dev/getUserStories";
      const response = await this.authenticatedFetch(endpoint);
      const jsonData: UserStory[] = (await response.json()) as UserStory[];
      const userStory = jsonData.find((user: UserStory) => user.id === id);
      if (!userStory) {
        throw new Error(`User story with id ${id} not found`);
      }
      return userStory;
    } catch (error) {
      throw new Error(
        "Failed to fetch data from API: User story with that id not found",
      );
    }
  }
  
  //ADD
  async addProject(progetto: Progetto): Promise<Boolean> {
    //TODO decide if its better to return the id
    try {
      const endpoint = `${API.baseUrl}/add_progetto`;
      const body = JSON.stringify({
        name: progetto.name,
          ai: progetto.ai,
	  cliente: progetto.cliente,
      });
      
      const response = await this.authenticatedFetch(endpoint, {
        body,
        method: "POST",
      });
      
      if (response.ok) {
          return (await response.json()).projectId;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("Error adding project:", error); //TODO is throwing error ok?
    }
  }
  async addEpicStory(epic: EpicStory, projectId: string): Promise<string> {
    //TODO the labda should return the id
    try {
      const endpoint = `${API.baseUrl}/add_epic_story`;
      const body = JSON.stringify({
        description: epic.descrizione,
        projectId: projectId,
      });
      
      const response = await this.authenticatedFetch(endpoint, {
        body,
        method: "POST",
      });
      
      if (response.ok) {
        return await response.json();
      } else {
        return undefined;
      }
    } catch (error) {
      throw new Error("Error adding episctory:", error); //TODO is throwing error ok?
    }
  }
  async addUserStrory(
    userStory: UserStory,
    projectId: string,
    epicStoryId: string,
  ): Promise<Boolean> {
    try {
      const endpoint = `${API.baseUrl}/add_user_story`;
      const body = JSON.stringify({
        projectId,
        epicStoryId,
        tag: userStory.tag,
        description: userStory.description,
      });
      
      const response = await this.authenticatedFetch(endpoint, { body, method: 'POST' });
      
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("Error adding project:", error); //TODO is throwing error ok?
    }
  }
  
  //UPDATE
  //updateUserStoryBasedOnFeedback(userStory: UserStory, feedback: Feedback): Promise<Boolean>
  async splitUserStory(userStory: UserStory): Promise<Boolean> {
    try {
      const endpoint = `${API.baseUrl}/split_user_story`;
      const body = JSON.stringify({
        "userStoryId": userStory.id
      });
      const response = await this.authenticatedFetch(endpoint, { body });
      if (!response.ok) {
        throw new Error(`Error splitting user story: ${response.statusText}`);
      }
      return true;
    } catch (error) {
      throw new Error(`Error splitting user story: ${error.message}`);
    }
  }

  //SET
  async setUserStoryState(projectId: string, userStoryId: string, passing: boolean): Promise<Boolean> {
    try {
      const endpoint = `${API.baseUrl}/set_user_story_state`;
      const body = JSON.stringify({
        "projectId": projectId,
        "userStoryId": userStoryId,
        "passing": passing
      });
      
      const response = await this.authenticatedFetch(endpoint, { body });
      
      if (!response.ok) {
        throw new Error(`Error updating user story state: ${response.statusText}`);
      }
      return true;
    } catch (error) {
      throw new Error(`Error updating user story state: ${error.message}`);
    }
  }
  
  //AI
    async bedrock(prompt: string, promptId: number): Promise<string> {
    try {
	const endpoint = `${API.baseUrl}/bedrock?message=${encodeURI(prompt)}&promptId=${promptId}`;
      
      const response = await this.authenticatedFetch(endpoint);
      
      if (response.ok) {
        return await response.json();
      } else {
        return undefined;
      }
    } catch (error) {
      throw new Error("Error while triync to connect to bedrock:", error); //TODO is throwing error ok?
    }
  }
  
  //chatgpt(prompt: string): Promise<string>;
  async sendBusinessRequirementsToAI(
    businessRequirements: string,
  ): Promise<Boolean> {
      await this.authenticatedFetch(`${API.baseUrl}/business_requirements`, {
	  method: 'POST',
	  body: JSON.stringify({
	      projectId,
	  })
      })
  }
  
  async invite(projectId: string, email: string, role: number): Promise<string> {
    const request = await this.authenticatedFetch(`${API.baseUrl}/invite`, {method: 'POST', body: JSON.stringify({
      projectId, email, role
    })})
    if (request.ok) {
      const response = await request.json();
      return response.invite.id
    } else {
      throw new Error('Couldn\'t create invite');
    }
  }
  
  async acceptInvite(inviteId: string): Promise<boolean> {
    const request = await this.authenticatedFetch(`${API.baseUrl}/accept_invite`, {method: 'POST', body: JSON.stringify({
      inviteId
    })})
    if (request.ok) {
      return true;
    } else {
      return false;
    }
  }
  
  /*async chatgpt(prompt: string): Promise<string> {
    const endpoint = '...';
    const response = await this.authenticatedFetch(endpoint, {method:'get', body: JSON.stringify({prompt})});
    if(response.ok){
      return (await response.json() as any).response;
    }
    else{
      throw new Error('Failed to fetch data from API: AI could not generate a response');
    }
    }*/

    async getNotifications() {
      return await (await this.authenticatedFetch(`${API.baseUrl}/notifications`)).json()
  }
    
    async readNotification(id: string) {
      await (await this.authenticatedFetch(`${API.baseUrl}/read_notification`, {
	  method: 'POST',
	  body: JSON.stringify({notification_id: id})
      })).json()
      return true;
  }
  
  //PRIVATE
  private async authenticatedFetch(
    url: string,
    options: object = {},
  ): Promise<any> {
    return await fetch(url, {
      ...options,
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
}
