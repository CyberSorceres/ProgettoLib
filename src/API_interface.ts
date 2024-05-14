import { ProjectData } from "./Progetto";
import { EpicData } from "./EpicStory";

export interface API_interface {

    getProgetto(id: string): Promise<ProjectData | null>;
    getEpicStory(id: string): Promise<EpicData | null>;
}