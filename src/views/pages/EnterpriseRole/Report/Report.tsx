import React, { useRef, useState } from "react";
import styles from "./Report.module.scss";
import classNames from "classnames/bind";
import {
  faEllipsisV,
  faCircleInfo,
  faFloppyDisk,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, parse } from "date-format-parse";
import {
  Card,
  CardHeader,
  Row,
  Button,
  Table,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  FormGroup,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
} from "reactstrap";
import Loading from "~/components/Loading/Loading";
import PerfectScrollbar from "react-perfect-scrollbar";
import { ProjectReportItem } from "~/types/Project";
import { Paging } from "~/types/Paging";
const cx = classNames.bind(styles);

function Report() {
  const pageAmount = 10;
  const inputRef = useRef<HTMLInputElement>(null);
  const [paging, setPaging] = useState<Paging>({
    pagingIndex: 1,
    totalPages: 1,
  });
  const renderPagination = () => {
    let paginationItems = [];
    console.log(paging.totalPages);
    for (let page = 1; page <= paging.totalPages; page++) {
      if (page == paging.pagingIndex) {
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

  const handleUpload = () => {
    inputRef.current?.click();
  };
  const [isLoading, setIsLoading] = useState(false);
  const [projectList, setProjectList] = useState<ProjectReportItem[]>([
    {
      id: "1",
      enterpriseName: "FPT-Software",
      name: "F-town 1",
      status: "Đang hoạt động",
      statusReport: "Đã báo cáo",
    },
    {
      id: "1",
      enterpriseName: "FPT-Software",
      name: "F-town 1",
      status: "Đang hoạt động",
      statusReport: "Chưa báo cáo",
    },
    {
      id: "1",
      enterpriseName: "FPT-Software",
      name: "F-town 1",
      status: "Đang hoạt động",
      statusReport: "Đã báo cáo",
    },
    {
      id: "1",
      enterpriseName: "FPT-Software",
      name: "F-town 1",
      status: "Đang hoạt động",
      statusReport: "Chưa báo cáo",
    },
    {
      id: "1",
      enterpriseName: "FPT-Software",
      name: "F-town 1",
      status: "Đang hoạt động",
      statusReport: "Đã báo cáo",
    },
  ]);
  return (
    <div className={cx("wrapper")}>
      <PerfectScrollbar>
        <div className=" scrollbar-inner">
          <Card className="m-4">
            <CardHeader className="">
              <Row>
                <Col sm="3" >
                  <h3 className="mb-0 d-inline-block mr-5">Tất cả các dự án</h3>
                </Col>
                <Col sm="2">
                  <Input
                    type="select"
                    // onChange={(event) => {
                    //   handleChange(event);
                    // }}
                  >
                    <option value="1">Quí 1</option>
                    <option value="2">Quí 2</option>
                    <option value="3">Quí 3</option>
                    <option value="4">Quí 4</option>
                  </Input>
                </Col>
                <Col sm="2">
                  <Input
                    type="select"
                    // onChange={(event) => {
                    //   handleChange(event);
                    // }}
                  >
                    <option value="1">Năm 2022</option>
                    <option value="2">Năm 2021</option>
                    <option value="3">Năm 2020</option>
                    <option value="4">Năm 2019</option>
                  </Input>
                </Col>
                <Col sm="5">
                  <input ref={inputRef} className="d-none" type="file" />
                  <Button
                    onClick={handleUpload}
                    className={cx("btnExcel") + " btn-icon mx-5"}
                    color="excel"
                    type="button">
                    <span className="btn-inner--icon mr-1">
                      <img
                        src={require("~img/icons/common/icons8-excel.png")}
                        alt="icon-excel"
                      />
                    </span>
                    <span className="btn-inner--text text-white">
                      Nhập dự án từ file excel
                    </span>
                  </Button>
                </Col>
              </Row>
            </CardHeader>

            <Table className={cx("table") + " align-items-center "} responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Tên dự án</th>
                  <th scope="col">Tên tổ chức kinh tế</th>
                  <th scope="col">Trạng thái báo cáo</th>
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
                      {/* status report */}
                      {project.statusReport === "Đã báo cáo" ? (
                        <td className="text-success">{project.statusReport}</td>
                      ) : null}
                      {project.statusReport === "Chưa báo cáo" ? (
                        <td className="text-danger">{project.statusReport}</td>
                      ) : null}
                      {/* status project */}
                      {project.status === "Đang hoạt động" ? (
                        <td className="text-success">{project.status}</td>
                      ) : null}
                      {project.status === "Đã thu hồi" ? (
                        <td className="text-danger">{project.status}</td>
                      ) : null}
                      <td>
                        <Row>
                          <Col sm="9">
                            <Row className="my-1">
                              <input
                                ref={inputRef}
                                className="d-none"
                                type="file"
                              />
                              <Col>
                                <Button
                                  onClick={handleUpload}
                                  className={cx("btnExcel") + " btn-icon"}
                                  color="excel"
                                  type="button">
                                  <span className="btn-inner--icon mr-1">
                                    <img
                                      src={require("~img/icons/common/icons8-excel.png")}
                                      alt="icon-excel"
                                    />
                                  </span>
                                  <span className="btn-inner--text text-white">
                                    Quý
                                  </span>
                                </Button>
                              </Col>
                            </Row>
                            <Row>
                              <input
                                ref={inputRef}
                                className="d-none"
                                type="file"
                              />
                              <Col>
                                <Button
                                  onClick={handleUpload}
                                  className={cx("btnExcel") + " btn-icon"}
                                  color="excel"
                                  type="button">
                                  <span className="btn-inner--icon mr-1">
                                    <img
                                      src={require("~img/icons/common/icons8-excel.png")}
                                      alt="icon-excel"
                                    />
                                  </span>
                                  <span className="btn-inner--text text-white">
                                    Năm
                                  </span>
                                </Button>
                              </Col>
                            </Row>
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

export default Report;
