import { format, parse } from "date-format-parse";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  Modal,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import enterpriseApi from "~/api/EnterpriseApi";
import projectApi from "~/api/ProjectApi";
import Toggle from "~/components/Toggle/Toggle";
import { EnterpriseDropdownItem } from "~/types/Enterprise";
import { Project } from "~/types/Project";
export interface stateType {
  id: string;
  isUpdate: boolean;
}
function ProjectDetail() {
  const data = useLocation().state as stateType;
  const id = data.id;
  const isUpdateScreen = data.isUpdate;
  const [isUpdate, setIsUpdate] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  type ProjectStatus = "Đang hoạt động" | "Đã thu hồi" | "Đã hoàn thành" | "";
  const [status, setStatus] = useState<ProjectStatus>("");
  useEffect(() => {
    setProject((prevState) => {
      console.log("status : " + status);
      return {
        ...prevState,
        status: status,
      };
    });
  }, [setStatus, status]);
  const [project, setProject] = useState<Project>({
    id: "",
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

  const fetchProject = async () => {
    try {
      const response = await projectApi.getProjectById(id);
      console.log("Fetch enterprises successfully", response);
      setProject(response.data);
      if (response.data.status === "Đang hoạt động") {
        setStatus("Đang hoạt động");
      } else {
        setStatus("Đã thu hồi");
      }
    } catch (error) {
      console.log("Failed to fetch enterprises", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.name, " : ", e.target.value);
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const submitUpdateProject = async () => {
    try {
      const response = await projectApi.updateProject({
        id: project.id,
        name: project.name,
        registrationCertificateDate: project.registrationCertificateDate,
        address: project.address,
        busRegCerNo: project.busRegCerNo,
        enterpriseId: project.enterpriseId,
        businessRegistrationAuthority: project.businessRegistrationAuthority,
        investmentRegistrationCertificateAuthority:
          project.investmentRegistrationCertificateAuthority,
        status: project.status,
      });
      fetchProject();
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

  useEffect(() => {
    fetchEnterpriseList().then(() => {
      fetchProject();
    });
  }, []);
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
                          <h3 className="mb-0">Thông tin dự án</h3>
                        </Col>
                        <Col sm="4">
                          <Toggle
                            isEditable={isUpdate}
                            onStr="Đang hoạt động"
                            offStr="Đã thu hồi"
                            isToggle={status === "Đang hoạt động"}
                            setStatus={setStatus}></Toggle>
                        </Col>
                      </Row>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col>
                          <FormGroup>
                            <label className="form-control-label" htmlFor="">
                              Tên dự án / Tên hợp đồng BCC
                            </label>
                            <Input
                              name="name"
                              type="text"
                              contentEditable={isUpdate}
                              disabled={!isUpdate}
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
                              Cơ quan cấp GCNĐKĐT
                            </label>
                            <Input
                              name="businessRegistrationAuthority"
                              type="text"
                              value={project.businessRegistrationAuthority}
                              contentEditable={isUpdate}
                              disabled={!isUpdate}
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
                              Mã số dự án / Số GCNĐT
                            </label>
                            <Input
                              name="busRegCerNo"
                              type="text"
                              value={project.busRegCerNo}
                              contentEditable={isUpdate}
                              disabled={!isUpdate}
                              onChange={(event) => {
                                handleChange(event);
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="5">
                          <FormGroup>
                            <label className="form-control-label" htmlFor="">
                              Ngày cấp
                            </label>
                            <Input
                              name="registrationCertificateDate"
                              type="date"
                              value={format(
                                parse(
                                  project?.registrationCertificateDate,
                                  "YYYY-MM-DD"
                                ),
                                "YYYY-MM-DD"
                              )}
                              contentEditable={isUpdate}
                              disabled={!isUpdate}
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
                              Vốn điều lệ
                            </label>
                            <Input
                              name="investmentRegistrationCertificateAuthority"
                              type="text"
                              value={
                                project.investmentRegistrationCertificateAuthority
                              }
                              contentEditable={isUpdate}
                              disabled={!isUpdate}
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
                              Địa điểm dự án
                            </label>
                            <Input
                              name="address"
                              type="text"
                              value={project.address}
                              contentEditable={isUpdate}
                              disabled={!isUpdate}
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
                              Tổ chức kinh tế thực hiện dự án
                            </label>
                            <Input
                              name="enterpriseId"
                              type="select"
                              disabled={!isUpdate}
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
                        Huỷ
                      </Button>
                    </>
                  ) : (
                    <Button
                      color="primary"
                      type="button"
                      onClick={() => setIsUpdate(true)}>
                      Cập nhật dự án
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
              <ModalFooter>
                <Button
                  className="new-event--add"
                  color="primary"
                  type="button"
                  onClick={() => submitUpdateProject()}>
                  Xác nhận
                </Button>
                <Button
                  className="ml-auto"
                  color="link"
                  type="button"
                  onClick={() => setIsOpenModal(false)}>
                  Hủy
                </Button>
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

export default ProjectDetail;
