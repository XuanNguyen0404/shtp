import classNames from "classnames/bind";
import styles from "./EnterpriseDetail.module.scss";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Modal,
  ModalHeader,
  Row,
} from "reactstrap";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Enterprise } from "~/types/Enterprise";
import enterpriseApi from "~/api/EnterpriseApi";
import { format, parse } from "date-format-parse";
import businessTypeApi from "~/api/BusinessTypeApi";
import countryApi from "~/api/CountryApi";
import enterpriseTypeApi from "~/api/EnterpriseTypeApi";
import industrialAreaTypeApi from "~/api/IndustrialAreaTypeApi";
import { BusinessType } from "~/types/BusinessType";
import { Country } from "~/types/Country";
import { EnterpriseType } from "~/types/EnterpriseType";
import { IndustrialAreaType } from "~/types/IndustrialAreaType";
import Toggle from "~/components/Toggle/Toggle";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);
export interface stateType {
  id: string;
  isUpdate: boolean;
}

type EnterpriseStatus = "Đang hoạt động" | "Giải thể" | "";
function EnterpriseDetail() {
  const data = useLocation().state as stateType;
  const id = data.id;
  const isUpdateScreen = data.isUpdate;
  const [businessTypes, setBusinessTypes] = useState<BusinessType[]>();
  const [enterpriseTypes, setEnterpriseTypes] = useState<EnterpriseType[]>();
  const [industrialAreaTypes, setIndustrialAreaTypes] =
    useState<IndustrialAreaType[]>();
  const [countries, setCountries] = useState<Country[]>();
  const [status, setStatus] = useState<EnterpriseStatus>("");
  useEffect(() => {
    setEnterprise((prevState) => {
      console.log("status : " + status);
      return {
        ...prevState,
        status: status,
      };
    });
  }, [setStatus, status]);

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

  const submitUpdateEnterprise = async () => {
    try {
      const response = await enterpriseApi.updateEnterprise({
        id: enterprise.id,
        name: enterprise.name,
        address: enterprise.address,
        bussinessLicenseNo: enterprise.bussinessLicenseNo,
        issuingAuthority: enterprise.issuingAuthority,
        issueDateBussinessLicenseNo: enterprise.issueDateBussinessLicenseNo,
        taxNumber: enterprise.taxNumber,
        issueDateTaxNumber: enterprise.issueDateBussinessLicenseNo,
        phoneNumber: enterprise.phoneNumber,
        faxNumber: enterprise.faxNumber,
        email: enterprise.email,
        websiteLink: enterprise.websiteLink,
        enterpriseTypeId: enterprise.enterpriseTypeId,
        industrialAreaTypeId: enterprise.industrialAreaTypeId,
        businessTypeId: enterprise.businessTypeId,
        countryId: enterprise.countryId,
        status: enterprise.status,
      });
      console.log("Update enterprises successfully", response);
      fetchEnterprise();
      setIsOpenModal(false);
      setIsUpdate(false);
      toast.success("Cập nhật thành công", {
        position: "top-right",
      });
    } catch (error) {
      toast.error("Cập nhật thất bại", {
        position: "top-right",
      });
      console.log("Update to add enterprises", error);
    }
  };
  const fetchEnterprise = async () => {
    try {
      const response = await enterpriseApi.getEnterpriseById(id);
      console.log("Fetch enterprises successfully", response);
      setEnterprise(response.data);
      if (response.data.status === "Đang hoạt động") {
        setStatus("Đang hoạt động");
      } else {
        setStatus("Giải thể");
      }
    } catch (error) {
      console.log("Failed to fetch enterprises", error);
    }
  };
  useEffect(() => {
    fetchBusisnessTypeList().then(() =>
      fetchEnterpriseTypeList().then(() =>
        fetchIndustrialAreaTypeList().then(() =>
          fetchCountryList().then(() => fetchEnterprise())
        )
      )
    );
  }, [setEnterprise]);

  const [isUpdate, setIsUpdate] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const addNewEvent = () => {
    setIsOpenModal(false);
    setIsUpdate(false);
  };
  return (
    <>
      <Container className="mt-2" fluid>
        <Card className="mb-4">
          <CardBody>
            <Row>
              <Col>
                <div className="card-wrapper">
                  <Card>
                    <CardHeader>
                      <Row>
                        <Col sm="8">
                          <h3 className="mb-0">Thông tin doanh nghiệp</h3>
                        </Col>
                        <Col sm="4">
                          <Toggle
                            isEditable={isUpdate}
                            onStr="Đang hoạt động"
                            offStr="Giải thể"
                            isToggle={status === "Đang hoạt động"}
                            setStatus={setStatus}></Toggle>
                        </Col>
                      </Row>
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
                              contentEditable={isUpdate}
                              disabled={!isUpdate}
                              placeholder="Nhập số chứng nhận"
                              type="text"
                              onChange={(event) => {
                                handleChange(event);
                              }}
                              value={enterprise.bussinessLicenseNo}
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
                              value={format(
                                parse(
                                  enterprise?.issueDateBussinessLicenseNo,
                                  "YYYY-MM-DD"
                                ),
                                "YYYY-MM-DD"
                              )}
                              type="date"
                              onChange={(event) => {
                                handleChange(event);
                              }}
                              contentEditable={isUpdate}
                              disabled={!isUpdate}
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
                              contentEditable={isUpdate}
                              disabled={!isUpdate}
                              placeholder=""
                              type="text"
                              onChange={(event) => {
                                handleChange(event);
                              }}
                              value={enterprise.issuingAuthority}
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
                              type="text"
                              contentEditable={isUpdate}
                              disabled={!isUpdate}
                              value={enterprise.name}
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
                              value={enterprise.businessTypeId}
                              // contentEditable={isUpdate}
                              disabled={!isUpdate}
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
                            <label className="form-control-label">
                              Loại hình doanh nghiệp
                            </label>

                            <Input
                              name="enterpriseTypeId"
                              type="select"
                              value={enterprise.enterpriseTypeId}
                              // contentEditable={isUpdate}
                              disabled={!isUpdate}
                              onChange={(event) => handleChange(event)}>
                              {enterpriseTypes?.map((enterpriseType, index) => (
                                <option key={index} value={enterpriseType.id}>
                                  {enterpriseType.name}
                                </option>
                              ))}
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
                              value={enterprise.taxNumber}
                              contentEditable={isUpdate}
                              disabled={!isUpdate}
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
                              value={format(
                                parse(
                                  enterprise?.issueDateTaxNumber,
                                  "YYYY-MM-DD"
                                ),
                                "YYYY-MM-DD"
                              )}
                              contentEditable={isUpdate}
                              disabled={!isUpdate}
                              type="date"
                              onChange={(event) => {
                                handleChange(event);
                              }}
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
                              value={enterprise.industrialAreaTypeId}
                              // contentEditable={isUpdate}
                              disabled={!isUpdate}
                              onChange={(event) => {
                                handleChange(event);
                              }}>
                              {industrialAreaTypes?.map(
                                (industrialArea, index) => (
                                  <option key={index} value={industrialArea.id}>
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
                              value={enterprise.countryId}
                              name="countryId"
                              type="select"
                              // contentEditable={isUpdate}
                              disabled={!isUpdate}
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
                        <Col sm="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="exampleFormControlInput1">
                              Email
                            </label>
                            <Input
                              name="email"
                              value={enterprise.email}
                              contentEditable={isUpdate}
                              disabled={!isUpdate}
                              placeholder="name@example.com"
                              type="email"
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
                              Số điện thoại
                            </label>
                            <Input
                              name="phoneNumber"
                              value={enterprise.phoneNumber}
                              contentEditable={isUpdate}
                              disabled={!isUpdate}
                              type="text"
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
                              Số fax
                            </label>
                            <Input
                              name="faxNumber"
                              value={enterprise.faxNumber}
                              contentEditable={isUpdate}
                              disabled={!isUpdate}
                              type="text"
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
                              Địa chỉ
                            </label>
                            <Input
                              name="address"
                              value={enterprise.address}
                              contentEditable={isUpdate}
                              disabled={!isUpdate}
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
                              value={enterprise.websiteLink}
                              type="text"
                              contentEditable={isUpdate}
                              disabled={!isUpdate}
                              onChange={(event) => {
                                handleChange(event);
                              }}
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
              {isUpdateScreen ? (
                <Col className="d-flex justify-content-end">
                  {isUpdate ? (
                    <>
                      <Button
                        color="primary"
                        type="button"
                        onClick={() => {
                          setIsOpenModal(true);
                        }}>
                        Lưu thay đổi
                      </Button>
                      <Button
                        color="danger"
                        type="button"
                        onClick={() => setIsUpdate(false)}>
                        Hủy
                      </Button>
                    </>
                  ) : (
                    <Button
                      color="primary"
                      type="button"
                      onClick={() => setIsUpdate(true)}>
                      Cập nhật
                    </Button>
                  )}
                </Col>
              ) : (
                <Col></Col>
              )}
            </Row>
            <Modal
              isOpen={isOpenModal}
              toggle={() => setIsOpenModal(false)}
              className="modal-dialog-centered modal-secondary">
              <ModalHeader>Bạn có chắc chắn?</ModalHeader>
              <div className="modal-body">
                <form className="new-event--form">
                  <FormGroup>
                    <p>Những thông tin sau sẽ được thay đổi</p>
                  </FormGroup>
                </form>
              </div>
              <div className="modal-footer">
                <Button
                  className="new-event--add"
                  color="primary"
                  type="button"
                  onClick={() => submitUpdateEnterprise()}>
                  Xác nhận
                </Button>
                <Button
                  className="ml-auto"
                  color="link"
                  type="button"
                  onClick={() => setIsOpenModal(false)}>
                  Hủy
                </Button>
              </div>
            </Modal>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

export default EnterpriseDetail;
