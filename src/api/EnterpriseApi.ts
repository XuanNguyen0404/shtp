import { Enterprise, EnterpriseDropdownItem, EnterpriseItem } from "~/types/Enterprise";
import axiosClient from "./axiosClient";

class EnterpriseApi {
  getlAllEnterpriseItemDropdown = () => {
    const url = `/Enterprises`;
    return axiosClient.get<EnterpriseDropdownItem[]>(url);
  };

  getEnterprises = (pageIndex: number, pageSize: number) => {
    const url = `/Enterprises/pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return axiosClient.get<{
      totalPages: number;
      itemList: EnterpriseItem[];
    }>(url);
  };

  getEnterpriseById = (id: string) => {
    const url = `/Enterprises/${id}`;
    return axiosClient.get<Enterprise>(url);
  };

  addEnterprise = (enterprise: Enterprise) => {
    const url = `/Enterprises`;
    return axiosClient.post(url, enterprise);
  };

  updateEnterprise = (enterprise: Enterprise) => {
    const url = `/Enterprises/${enterprise.id}`;
    return axiosClient.put(url, enterprise);
  };

  deleteEnterprise = (id: string) => {
    const url = `/Enterprises/${id}`;
    return axiosClient.delete(url);
  };
}

const enterpriseApi = new EnterpriseApi();
export default enterpriseApi;
