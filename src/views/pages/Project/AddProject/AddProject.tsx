import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import enterpriseApi from "src/api/EnterpriseApi";
import projectApi from "src/api/ProjectApi";
import { EnterpriseDropdownItem } from "src/types/Enterprise";
import { Project } from "src/types/Project";
function AddProject() {
  let navigate = useNavigate();
  const [project, setProject] = useState<Project>({
    name: "",
    address: "",
    status: "",
    registrationCertificateDate: "",
    enterpriseName: "",
    busRegCerNo: "",
    businessRegistrationAuthority: "",
    enterpriseId: "",
    investmentRegistrationCertificateAuthority: "",
  });
  const [enterpriseDropdownItems, setEnterpriseDropdownItems] = useState<
    EnterpriseDropdownItem[]
  >([]);

  const fetchEnterpriseList = async () => {
    try {
      const response = await enterpriseApi.getlAllEnterpriseItemDropdown();
      console.log("Fetch enterprises dropdown item successfully", response);
      setEnterpriseDropdownItems(response.data);
      setProject((prevState) => {
        return {
          ...prevState,
          enterpriseId: response.data[0].id,
        };
      });
      console.log(response.data);
    } catch (error) {
      console.log("Failed to fetch enterprises dropdown item : ", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.name, " : ", e.target.value);
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const submitAddProject = async () => {
    try {
      const response = await projectApi.addProject({
        name: project.name,
        registrationCertificateDate: project.registrationCertificateDate,
        address: project.address,
        busRegCerNo: project.busRegCerNo,
        enterpriseId: project.enterpriseId,
        businessRegistrationAuthority: project.businessRegistrationAuthority,
        investmentRegistrationCertificateAuthority:
          project.investmentRegistrationCertificateAuthority,
        status: "??ang ho???t ?????ng",
      });
      console.log("Add project successfully", response);
      toast.success("Th??m d??? ??n th??nh c??ng !");
      navigate("/project");
    } catch (error) {
      console.log("Failed to add enterprises", error);
      toast.error("Th??m d??? ??n th???t b???i !");
    }
  };

  useEffect(() => {
    fetchEnterpriseList();
  }, []);

  return (
    <>
      <Container className="mt-2" fluid>
        <Card className="mb-4">
          <CardHeader>
            <h1 className="mb-0">Th??m d??? ??n m???i</h1>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <div className="card-wrapper">
                  <Card>
                    <CardHeader>
                      <h3 className="mb-0">Th??ng tin d??? ??n</h3>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col>
                          <FormGroup>
                            <label className="form-control-label" htmlFor="">
                              T??n d??? ??n / T??n h???p ?????ng BCC
                            </label>
                            <Input
                              name="name"
                              type="text"
                              value={project.name}
                              onChange={(event) => {
                                handleChange(event);
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <label className="form-control-label" htmlFor="">
                              C?? quan c???p GCN??K??T
                            </label>
                            <Input
                              name="businessRegistrationAuthority"
                              type="text"
                              value={project.businessRegistrationAuthority}
                              onChange={(event) => {
                                handleChange(event);
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="7">
                          <FormGroup>
                            <label className="form-control-label" htmlFor="">
                              M?? s??? d??? ??n / S??? GCN??T
                            </label>
                            <Input
                              name="busRegCerNo"
                              type="text"
                              value={project.busRegCerNo}
                              onChange={(event) => {
                                handleChange(event);
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="5">
                          <FormGroup>
                            <label className="form-control-label" htmlFor="">
                              Ng??y c???p
                            </label>
                            <Input
                              name="registrationCertificateDate"
                              type="date"
                              value={project.registrationCertificateDate}
                              onChange={(event) => {
                                handleChange(event);
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <label className="form-control-label" htmlFor="">
                              V???n ??i???u l???
                            </label>
                            <Input
                              name="investmentRegistrationCertificateAuthority"
                              type="text"
                              value={
                                project.investmentRegistrationCertificateAuthority
                              }
                              onChange={(event) => {
                                handleChange(event);
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <label className="form-control-label" htmlFor="">
                              ?????a ??i???m d??? ??n
                            </label>
                            <Input
                              name="address"
                              type="text"
                              value={project.address}
                              onChange={(event) => {
                                handleChange(event);
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <label className="form-control-label" htmlFor="">
                              T??? ch???c kinh t??? th???c hi???n d??? ??n
                            </label>
                            <Input
                              name="enterpriseName"
                              type="select"
                              value={project.enterpriseId}
                              onChange={(event) => {
                                handleChange(event);
                              }}>
                              {enterpriseDropdownItems?.map(
                                (enterpriseDropdownItem, index) => (
                                  <option
                                    key={index}
                                    value={enterpriseDropdownItem.id}>
                                    {enterpriseDropdownItem.name}
                                  </option>
                                )
                              )}
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-end">
                <Button
                  color="primary"
                  type="button"
                  onClick={submitAddProject}>
                  Th??m d??? ??n
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

export default AddProject;
