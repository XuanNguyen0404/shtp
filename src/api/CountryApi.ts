import { Country } from "src/types/Country";
import axiosClient from "./axiosClient";

class CountryApi {
  getAllCountryApi = () => {
    const url = `/Countries`;
    return axiosClient.get<Country[]>(url);
  };
}
const countryApi = new CountryApi();
export default countryApi;
