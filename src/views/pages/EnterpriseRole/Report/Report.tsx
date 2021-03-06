import React, { useRef, useState } from "react";
import styles from "./Report.module.scss";
import classNames from "classnames/bind";
import {
  faEllipsisV,
  faCircleInfo,
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
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import Loading from "src/components/Loading/Loading";
import { Paging } from "src/types/Paging";
import { ProjectReportItem } from "src/types/Project";
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
      status: "??ang ho???t ?????ng",
      statusReport: "???? b??o c??o",
    },
    {
      id: "1",
      enterpriseName: "FPT-Software",
      name: "F-town 1",
      status: "??ang ho???t ?????ng",
      statusReport: "Ch??a b??o c??o",
    },
    {
      id: "1",
      enterpriseName: "FPT-Software",
      name: "F-town 1",
      status: "??ang ho???t ?????ng",
      statusReport: "???? b??o c??o",
    },
    {
      id: "1",
      enterpriseName: "FPT-Software",
      name: "F-town 1",
      status: "??ang ho???t ?????ng",
      statusReport: "Ch??a b??o c??o",
    },
    {
      id: "1",
      enterpriseName: "FPT-Software",
      name: "F-town 1",
      status: "??ang ho???t ?????ng",
      statusReport: "???? b??o c??o",
    },
  ]);
  return (
    <div className={cx("wrapper")}>
      <PerfectScrollbar>
        <div className=" scrollbar-inner">
          <Card className="m-4">
            <CardHeader className="">
              <Row>
                <Col sm="3">
                  <h3 className="mb-0 d-inline-block mr-5">T???t c??? c??c d??? ??n</h3>
                </Col>
                <Col sm="2">
                  <Input
                    type="select"
                    // onChange={(event) => {
                    //   handleChange(event);
                    // }}
                  >
                    <option value="1">Qu?? 1</option>
                    <option value="2">Qu?? 2</option>
                    <option value="3">Qu?? 3</option>
                    <option value="4">Qu?? 4</option>
                  </Input>
                </Col>
                <Col sm="2">
                  <Input
                    type="select"
                    // onChange={(event) => {
                    //   handleChange(event);
                    // }}
                  >
                    <option value="1">N??m 2022</option>
                    <option value="2">N??m 2021</option>
                    <option value="3">N??m 2020</option>
                    <option value="4">N??m 2019</option>
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
                        src={require("src/assets/img/icons/common/icons8-excel.png")}
                        alt="icon-excel"
                      />
                    </span>
                    <span className="btn-inner--text text-white">
                      Nh???p d??? ??n t??? file excel
                    </span>
                  </Button>
                </Col>
              </Row>
            </CardHeader>

            <Table className={cx("table") + " align-items-center "} responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">T??n d??? ??n</th>
                  <th scope="col">T??n t??? ch???c kinh t???</th>
                  <th scope="col">Tr???ng th??i b??o c??o</th>
                  <th scope="col">Tr???ng th??i</th>
                  <th scope="col">H??nh ?????ng</th>
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
                      {project.statusReport === "???? b??o c??o" ? (
                        <td className="text-success">{project.statusReport}</td>
                      ) : null}
                      {project.statusReport === "Ch??a b??o c??o" ? (
                        <td className="text-danger">{project.statusReport}</td>
                      ) : null}
                      {/* status project */}
                      {project.status === "??ang ho???t ?????ng" ? (
                        <td className="text-success">{project.status}</td>
                      ) : null}
                      {project.status === "???? thu h???i" ? (
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
                                      src={require("src/assets/img/icons/common/icons8-excel.png")}
                                      alt="icon-excel"
                                    />
                                  </span>
                                  <span className="btn-inner--text text-white">
                                    Qu??
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
                                      src={require("src/assets/img/icons/common/icons8-excel.png")}
                                      alt="icon-excel"
                                    />
                                  </span>
                                  <span className="btn-inner--text text-white">
                                    N??m
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
                                    Xem chi ti???t
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
