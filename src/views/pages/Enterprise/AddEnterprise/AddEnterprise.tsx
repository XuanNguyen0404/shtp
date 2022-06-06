import React, { useEffect, useState } from "react";
import styles from "./AddEnterprise.module.scss";
import PerfectScrollbar from "react-perfect-scrollbar";
import { toast } from "react-toastify";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import businessTypeApi from "src/api/BusinessTypeApi";
import countryApi from "src/api/CountryApi";
import enterpriseApi from "src/api/EnterpriseApi";
import enterpriseTypeApi from "src/api/EnterpriseTypeApi";
import industrialAreaTypeApi from "src/api/IndustrialAreaTypeApi";
import { BusinessType } from "src/types/BusinessType";
import { Country } from "src/types/Country";
import { Enterprise } from "src/types/Enterprise";
import { EnterpriseType } from "src/types/EnterpriseType";
import { IndustrialAreaType } from "src/types/IndustrialAreaType";
const cx = classNames.bind(styles);

function AddEnterprise() {
  let navigate = useNavigate();
  const [enterprise, setEnterprise] = useState<Enterprise>({
    id: "",
    name: "",
    issueDateBussinessLicenseNo: "",
    status: "",
    address: "",
    bussinessLicenseNo: "",
    issuingAuthority: "",
    taxNumber: "",
    issueDateTaxNumber: "",
    phoneNumber: "",
    faxNumber: "",
    email: "",
    websiteLink: "",
    enterpriseTypeId: "",
    industrialAreaTypeId: "",
    businessTypeId: "",
    countryId: "",
    businessType: "",
    country: "",
    enterpriseType: "",
    industrialAreaType: "",
    employeeTypeOfEnterprises: "",
    employees: "",
    projects: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.name, " : ", e.target.value);
    setEnterprise({ ...enterprise, [e.target.name]: e.target.value });
  };
  const fetchBusisnessTypeList = async () => {
    try {
      const response = await businessTypeApi.getAllBusinessTypeApi();
      console.log("Fetch businessType successfully", response);
      setBusinessTypes(response.data);
      setEnterprise((prevState) => {
        return {
          ...prevState,
          businessTypeId: response.data[0].id,
        };
      });
      console.log(response.data);
    } catch (error) {
      console.log("Failed to fetch businessType", error);
    }
  };
  const fetchEnterpriseTypeList = async () => {
    try {
      const response = await enterpriseTypeApi.getAllEnterpriseTypesApi();
      console.log("Fetch enterpriseTypes successfully", response);
      setEnterpriseTypes(response.data);
      setEnterprise((prevState) => {
        return {
          ...prevState,
          enterpriseTypeId: response.data[0].id,
        };
      });
      console.log(response.data);
    } catch (error) {
      console.log("Failed to fetch enterpriseType", error);
    }
  };
  const fetchIndustrialAreaTypeList = async () => {
    try {
      const response =
        await industrialAreaTypeApi.getAllIndustrialAreaTypeApi();
      console.log("Fetch industrialAreaType successfully", response);
      setIndustrialAreaTypes(response.data);
      setEnterprise((prevState) => {
        return {
          ...prevState,
          industrialAreaTypeId: response.data[0].id,
        };
      });
      console.log(response.data);
    } catch (error) {
      console.log("Failed to fetch industrialAreaType", error);
    }
  };
  const fetchCountryList = async () => {
    try {
      const response = await countryApi.getAllCountryApi();
      console.log("Fetch countries successfully", response);
      setCountries(response.data);
      setEnterprise((prevState) => {
        return {
          ...prevState,
          countryId: response.data[0].id,
        };
      });
      console.log(response.data);
    } catch (error) {
      console.log("Failed to fetch countries", error);
    }
  };

  useEffect(() => {
    fetchBusisnessTypeList();
    fetchEnterpriseTypeList();
    fetchIndustrialAreaTypeList();
    fetchCountryList();
  }, []);

  const submitAddEnterprise = async () => {
    try {
      const response = await enterpriseApi.addEnterprise({
        name: enterprise.name,
        address: enterprise.address,
        bussinessLicenseNo: enterprise.bussinessLicenseNo,
        issuingAuthority: enterprise.issuingAuthority,
        issueDateBussinessLicenseNo:
          enterprise.issueDateBussinessLicenseNo + "T00:00:00",
        taxNumber: enterprise.taxNumber,
        issueDateTaxNumber:
          enterprise.issueDateBussinessLicenseNo + "T00:00:00",
        phoneNumber: enterprise.phoneNumber,
        faxNumber: enterprise.faxNumber,
        email: enterprise.email,
        websiteLink: enterprise.websiteLink,
        enterpriseTypeId: enterprise.enterpriseTypeId,
        industrialAreaTypeId: enterprise.industrialAreaTypeId,
        businessTypeId: enterprise.businessTypeId,
        countryId: enterprise.countryId,
        status: "Đang hoạt động",
      });
      console.log("Add enterprises successfully", response);
      toast.success("Thêm doanh nghiệp thành công !");
      navigate("/enterprise");
    } catch (error) {
      toast.error("Thêm doanh nghiệp thất bại !");
      console.log("Failed to add enterprises", error);
    }
  };

  const [businessTypes, setBusinessTypes] = useState<BusinessType[]>();
  const [enterpriseTypes, setEnterpriseTypes] = useState<EnterpriseType[]>();
  const [industrialAreaTypes, setIndustrialAreaTypes] =
    useState<IndustrialAreaType[]>();
  const [countries, setCountries] = useState<Country[]>();

  return (
    <PerfectScrollbar>
      <div className=" scrollbar-inner">
        <Container className="mt-2" fluid>
          <Card className="mb-4">
            <CardBody>
              {/* ROW Thông tin */}
              <Row>
                <Col>
                  <div className="card-wrapper">
                    <Card>
                      <CardHeader>
                        <h3 className="mb-0">Thông tin doanh nghiệp</h3>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <Col sm="7">
                            <FormGroup>
                              <label className="form-control-label" htmlFor="">
                                Số chứng nhận đăng kí doanh nghiệp
                              </label>
                              <Input
                                name="bussinessLicenseNo"
                                value={enterprise?.bussinessLicenseNo}
                                placeholder="Nhập số chứng nhận"
                                type="text"
                                onChange={(event) => {
                                  handleChange(event);
                                }}
                              />
                            </FormGroup>
                          </Col>
                          <Col sm="5">
                            <FormGroup>
                              <label className="form-control-label" htmlFor="">
                                Ngày chứng nhận đăng kí doanh nghiệp
                              </label>
                              <Input
                                name="issueDateBussinessLicenseNo"
                                value={enterprise?.issueDateBussinessLicenseNo}
                                id="example-date-input"
                                type="date"
                                onChange={(event) => {
                                  handleChange(event);
                                }}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1">
                                Cơ quan cấp giấy chứng nhận đăng kí doanh nghiệp
                              </label>
                              <Input
                                name="issuingAuthority"
                                value={enterprise?.issuingAuthority}
                                placeholder=""
                                onChange={(event) => {
                                  handleChange(event);
                                }}
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col sm="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Tên Doanh Nghiệp
                              </label>
                              <Input
                                name="name"
                                value={enterprise?.name}
                                type="text"
                                onChange={(event) => {
                                  handleChange(event);
                                }}
                              />
                            </FormGroup>
                          </Col>
                          <Col sm="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="exampleFormControlSelect1">
                                Loại hình kinh doanh
                              </label>
                              <Input
                                name="businessTypeId"
                                type="select"
                                onChange={(event) => {
                                  handleChange(event);
                                }}>
                                {businessTypes?.map((businessType, index) => (
                                  <option key={index} value={businessType.id}>
                                    {businessType.name}
                                  </option>
                                ))}
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="exampleFormControlSelect1">
                                Loại hình doanh nghiệp
                              </label>
                              <Input
                                name="enterpriseTypeId"
                                type="select"
                                onChange={(event) => {
                                  handleChange(event);
                                }}>
                                {enterpriseTypes?.map(
                                  (enterpriseType, index) => (
                                    <option
                                      key={index}
                                      value={enterpriseType.id}>
                                      {enterpriseType.name}
                                    </option>
                                  )
                                )}
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Mã số thuế
                              </label>

                              <Input
                                name="taxNumber"
                                value={enterprise?.taxNumber}
                                type="text"
                                onChange={(event) => {
                                  handleChange(event);
                                }}
                              />
                            </FormGroup>
                          </Col>
                          <Col sm="6">
                            <FormGroup>
                              <label className={cx("form-control-label")}>
                                Ngày cấp mã số thuế
                              </label>
                              <Input
                                name="issueDateTaxNumber"
                                value={enterprise?.issueDateTaxNumber}
                                onChange={(event) => {
                                  handleChange(event);
                                }}
                                type="date"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="exampleFormControlSelect1">
                                Loại hình khu công nghiệp
                              </label>
                              <Input
                                name="industrialAreaTypeId"
                                type="select"
                                onChange={(event) => {
                                  handleChange(event);
                                }}>
                                {industrialAreaTypes?.map(
                                  (industrialArea, index) => (
                                    <option
                                      key={index}
                                      value={industrialArea.id}>
                                      {industrialArea.name}
                                    </option>
                                  )
                                )}
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col sm="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="exampleFormControlSelect1">
                                Quốc gia
                              </label>
                              <Input
                                name="countryId"
                                type="select"
                                onChange={(event) => {
                                  handleChange(event);
                                }}>
                                {countries?.map((country, index) => (
                                  <option key={index} value={country.id}>
                                    {country.name}
                                  </option>
                                ))}
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </div>
                </Col>
                <Col>
                  <div className="card-wrapper">
                    <Card>
                      <CardHeader>
                        <h3 className="mb-0">Thông tin liên lạc</h3>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          {" "}
                          <Col sm="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1">
                                Email
                              </label>
                              <Input
                                name="email"
                                value={enterprise?.email}
                                onChange={(event) => {
                                  handleChange(event);
                                }}
                                placeholder="name@example.com"
                                type="email"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1">
                                Số điện thoại
                              </label>
                              <Input
                                name="phoneNumber"
                                onChange={(event) => {
                                  handleChange(event);
                                }}
                                value={enterprise?.phoneNumber}
                                id="exampleFormControlInput1"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1">
                                Số fax
                              </label>
                              <Input
                                name="faxNumber"
                                value={enterprise.faxNumber}
                                id="exampleFormControlInput1"
                                onChange={(event) => {
                                  handleChange(event);
                                }}
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1">
                                Địa chỉ
                              </label>
                              <Input
                                name="address"
                                value={enterprise.address}
                                onChange={(event) => {
                                  handleChange(event);
                                }}
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="12">
                            <FormGroup>
                              <label className="form-control-label">
                                Website
                              </label>

                              <Input
                                name="websiteLink"
                                value={enterprise?.websiteLink}
                                onChange={(event) => {
                                  handleChange(event);
                                }}
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </div>
                </Col>
              </Row>
              {/* ROW Button */}
              <Row>
                <Col
                  className="d-flex justify-content-end"
                  onClick={() => submitAddEnterprise}>
                  <Button
                    color="primary"
                    type="button"
                    onClick={() => submitAddEnterprise()}>
                    Thêm doanh nghiệp
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    </PerfectScrollbar>
  );
}

export default AddEnterprise;
