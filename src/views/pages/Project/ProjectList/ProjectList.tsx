import React, { useEffect, useState } from "react";
import styles from "./ProjectList.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Modal,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  faCircleInfo,
  faEllipsisV,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import projectApi from "src/api/ProjectApi";
import Loading from "src/components/Loading/Loading";
import { Paging } from "src/types/Paging";
import { ProjectItem } from "src/types/Project";

const cx = classNames.bind(styles);


function ProjectList() {
  const pageAmount = 10;
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [idDelete, setIdDelete] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [paging, setPaging] = useState<Paging>({
    pagingIndex: 1,
    totalPages: 1,
  });
  const [projectList, setProjectList] = useState<ProjectItem[]>([]);
  let navigate = useNavigate();
  const closeModalDelete = () => {
    setIsOpenModalDelete(false);
  };
  const redirectAddProject = () => {
    navigate("/add-project");
  };

  const redirectUpdateProject = (idProject: string) => {
    navigate("/detail-project", {
      state: {
        id: idProject,
        isUpdate: true,
      },
    });
  };

  const redirectProjectDetail = (idProject: string) => {
    navigate("/detail-project", {
      state: {
        id: idProject,
        isUpdate: false,
      },
    });
  };

  const renderPagination = () => {
    let paginationItems = [];
    console.log(paging.totalPages);
    for (let page = 1; page <= paging.totalPages; page++) {
      if (page === paging.pagingIndex) {
        paginationItems.push(
          <PaginationItem className="active" key={page}>
            <PaginationLink href="#" onClick={(e) => e.preventDefault()}>
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      } else {
        paginationItems.push(
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              onClick={() => {
                setPaging((prevState) => {
                  return {
                    ...prevState,
                    pagingIndex: page,
                  };
                });
              }}>
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
    return paginationItems;
  };

  const fetchProjectList = async (pageIndex: number, pageAmount: number) => {
    try {
      const response = await projectApi.getProjects(pageIndex, pageAmount);
      console.log("Fetch enterprises successfully", response);
      setProjectList(response.data.itemList);
      setPaging({
        pagingIndex: pageIndex,
        totalPages: response.data.totalPages,
      });
      console.log(response.data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.log("Failed to fetch enterprises", error);
    }
  };

  const submitDelete = async (deleteId: string) => {
    try {
      await projectApi.deleteProject(deleteId);
      console.log("Delete project successfully");
      fetchProjectList(paging.pagingIndex, pageAmount);
      toast.success("Xoá thành công");
      closeModalDelete();
    } catch (error) {
      toast.error("Xoá thất bại");
      console.log("Failed to delete project");
    }
  };

  useEffect(() => {
    fetchProjectList(paging.pagingIndex, pageAmount);
  }, [paging.pagingIndex]);

  return (
    <div className={cx("wrapper")}>
      <PerfectScrollbar>
        <div className=" scrollbar-inner">
          <Card className="m-4">
            <CardHeader className="border-0 d-flex justify-content-between">
              <h3 className="mb-0 d-inline-block mr-5">Tất cả các dự án</h3>
              <Row>
                <Button
                  className={cx("btnExcel") + " btn-icon mx-5"}
                  color="excel"
                  type="button">
                  <span className="btn-inner--icon mr-1">
                    <img
                      src={require("src/assets/img/icons/common/icons8-excel.png")}
                      alt="icon-excel"
                    />
                  </span>
                  <span className="btn-inner--text text-white">
                    Nhập dự án từ file excel
                  </span>
                </Button>
                <Button
                  onClick={redirectAddProject}
                  className={cx("btnAdd") + " btn-icon mx-5"}
                  color="excel"
                  type="button">
                  <span className="btn-inner--icon mr-1">
                    <img
                      src={require("src/assets/img/icons/common/icons8-plus.png")}
                      alt="icon-excel"
                    />
                  </span>
                  <span className="btn-inner--text text-white">
                    Thêm dự án mới
                  </span>
                </Button>
              </Row>
            </CardHeader>

            <Table className={cx("table") + " align-items-center "} responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Tên dự án</th>
                  <th scope="col">Tên tổ chức kinh tế</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody className="list">
                {isLoading ? (
                  <tr>
                    <td colSpan={6}>
                      <Loading />
                    </td>
                  </tr>
                ) : (
                  <></>
                )}
                {projectList.map((project, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">
                        {(paging.pagingIndex - 1) * pageAmount + index + 1}
                      </th>
                      <td>{project.name}</td>
                      <td>{project.enterpriseName}</td>

                      {project.status === "Đang hoạt động" ? (
                        <td className="text-success">{project.status}</td>
                      ) : null}
                      {project.status === "Đã thu hồi" ? (
                        <td className="text-danger">{project.status}</td>
                      ) : null}
                      <td>
                        <Row>
                          <Col sm="9">
                            <Button
                              onClick={() => {
                                redirectUpdateProject(project.id);
                              }}
                              type="button"
                              className="btn-success mx-1">
                              Sửa
                            </Button>
                            <Button
                              onClick={() => {
                                setIdDelete(project.id);
                                setIsOpenModalDelete(true);
                              }}
                              type="button"
                              className="btn-danger mx-1">
                              Xoá
                            </Button>
                          </Col>

                          <Col
                            sm="3"
                            className="d-flex justify-content-center align-items-center">
                            <UncontrolledDropdown>
                              <DropdownToggle tag="a">
                                <FontAwesomeIcon
                                  className={cx("smMenu")}
                                  icon={faEllipsisV}></FontAwesomeIcon>
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem
                                  onClick={() =>
                                    redirectProjectDetail(project.id)
                                  }
                                  className={
                                    cx("menuItem") +
                                    " noti-title d-flex justify-content-between align-items-center my-1"
                                  }
                                  tag="div">
                                  <span className="text-overflow m-0">
                                    Xem chi tiết
                                  </span>
                                  <FontAwesomeIcon
                                    icon={faCircleInfo}
                                    color="#999999"></FontAwesomeIcon>
                                </DropdownItem>
                                <DropdownItem
                                  className={
                                    cx("menuItem") +
                                    " noti-title d-flex justify-content-between align-items-center my-1"
                                  }
                                  tag="div">
                                  <span className="text-overflow m-0 ">
                                    Xem báo cáo
                                  </span>
                                  <FontAwesomeIcon
                                    icon={faFloppyDisk}
                                    color="#999999"></FontAwesomeIcon>
                                </DropdownItem>
                                <DropdownItem
                                  className={
                                    cx("menuItem") +
                                    " noti-title d-flex justify-content-between align-items-center my-1"
                                  }
                                  tag="div">
                                  <span className="text-overflow m-0 ">
                                    Xem báo cáo
                                  </span>
                                  <FontAwesomeIcon
                                    icon={faFloppyDisk}
                                    color="#999999"></FontAwesomeIcon>
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Modal
              isOpen={isOpenModalDelete}
              toggle={() => setIsOpenModalDelete(false)}>
              <div className="modal-header">Bạn có chắc chắn?</div>
              <div className="modal-body">
                <FormGroup>
                  <p>Những thông tin sau sẽ được xoá</p>
                </FormGroup>
              </div>

              <div className="modal-footer">
                <Button onClick={() => submitDelete(idDelete)} color="danger">
                  Xác nhận
                </Button>
                <Button
                  onClick={closeModalDelete}
                  className="ml-auto"
                  color="link"
                  type="button">
                  Hủy
                </Button>
              </div>
            </Modal>
            <CardFooter className="py-4">
              <nav aria-label="...">
                <Pagination
                  className="pagination justify-content-end mb-0"
                  listClassName="justify-content-end mb-0">
                  <PaginationItem className="disabled">
                    <PaginationLink
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}>
                      <i className="fas fa-angle-left" />
                      <span className="sr-only">Previous</span>
                    </PaginationLink>
                  </PaginationItem>
                  {renderPagination()}

                  <PaginationItem>
                    <PaginationLink href="#pablo">
                      <i className="fas fa-angle-right" />
                      <span className="sr-only">Next</span>
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </nav>
            </CardFooter>
          </Card>
        </div>
      </PerfectScrollbar>
    </div>
  );
}

export default ProjectList;
