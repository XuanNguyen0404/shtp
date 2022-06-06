import { Project, ProjectItem } from "~/types/Project";
import axiosClient from "./axiosClient";

class ProjectApi {
  getProjects = (pageIndex: number, pageSize: number) => {
    const url = `/Projects/pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return axiosClient.get<{
      totalPages: number;
      itemList: ProjectItem[];
    }>(url);
  };

  getProjectById = (id: string) => {
    const url = `/Projects/${id}`;
    return axiosClient.get<Project>(url);
  };

  addProject = (project: Project) => {
    const url = `/Projects`;
    return axiosClient.post(url, project);
  };

  updateProject = (project: Project) => {
    const url = `/Projects/${project.id}`;
    return axiosClient.put(url, project);
  };

  deleteProject = (id: string) => {
    const url = `/Projects/${id}`;
    return axiosClient.delete(url);
  };
}

const projectApi = new ProjectApi();
export default projectApi;
