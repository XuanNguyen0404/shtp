import { IndustrialAreaType } from "~/types/IndustrialAreaType";
import axiosClient from "./axiosClient";

class IndustrialAreaTypeApi {
  getAllIndustrialAreaTypeApi = () => {
    const url = `/IndustrialAreaTypes`;
    return axiosClient.get<IndustrialAreaType[]>(url);
  };
}
const industrialAreaTypeApi = new IndustrialAreaTypeApi();
export default industrialAreaTypeApi;
