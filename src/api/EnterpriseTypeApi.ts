import { EnterpriseType } from "src/types/EnterpriseType";
import axiosClient from "./axiosClient";

class EnterpriseTypeApi {
  getAllEnterpriseTypesApi = () => {
    const url = `/EnterpriseTypes`;
    return axiosClient.get<EnterpriseType[]>(url);
  };
}
const enterpriseTypeApi = new EnterpriseTypeApi();
export default enterpriseTypeApi;
