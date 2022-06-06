import { BusinessType } from "~/types/BusinessType";
import axiosClient from "./axiosClient";

class BusinessTypeApi {
  getAllBusinessTypeApi = () => {
    const url = `/BusinessTypes`;
    return axiosClient.get<BusinessType[]>(url);
  };
}
const businessTypeApi = new BusinessTypeApi();
export default businessTypeApi;
