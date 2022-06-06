import classNames from "classnames/bind";
import styles from "./EnterpriseList.module.scss";
import { useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { parse, format } from "date-format-parse";
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
  FormText,
  Input,
  Modal,
  ModalHeader,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
import {
  faEllipsisV,
  faCircleInfo,
  faFloppyDisk,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import enterpriseApi from "~/api/EnterpriseApi";
import { Paging } from "~/types/Paging";
import { EnterpriseItem } from "~/types/Enterprise";
import { toast } from "react-toastify";
import Loading from "~/components/Loading/Loading";

const cx = classNames.bind(styles);

function EnterpriseList() {
  const pageAmount = 10;
  const [paging, setPaging] = useState<Paging>({
    pagingIndex: 1,
    totalPages: 1,
  });

  const submitDelete = async (deleteId: string) => {
    try {
      const response = await enterpriseApi.deleteEnterprise(deleteId);
      console.log("Delete enterprise successfully");
      fetchEnterpriseList(paging.pagingIndex, pageAmount);
      toast.success("Xoá thành công");
      closeModalDelete();
    } catch (error) {
      toast.error("Xoá thất bại");
      console.log("Failed to delete enterprise");
    }
  };

  const [enterpriseList, setEnterpriseList] = useState<EnterpriseItem[]>([]);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [idDelete, setIdDelete] = useState<string>("");
  let navigate = useNavigate();
  const fetchEnterpriseList = async (pageIndex: number, pageAmount: number) => {
    try {
      const response = await enterpriseApi.getEnterprises(
        pageIndex,
        pageAmount
      );
      console.log("Fetch enterprises successfully", response);
      setEnterpriseList(response.data.itemList);
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
  useEffect(() => {
    fetchEnterpriseList(paging.pagingIndex, pageAmount);
  }, [paging.pagingIndex]);

  const closeModalDelete = () => {
    setIsOpenModalDelete(false);
  };

  const redirectUpdateEnterprise = (idEnterprise: string) => {
    navigate("/detail-enterprise", {
      state: {
        id: idEnterprise,
        isUpdate: true,
      },
    });
  };

  const redirectEnterpriseDetail = (idEnterprise: string) => {
    navigate("/detail-enterprise", {
      state: {
        id: idEnterprise,
        isUpdate: false,
      },
    });
  };
  const redirectAddEnterprise = () => {
    navigate("/add-enterprise");
  };
  return (
    <div className={cx("wrapper")}>
      <PerfectScrollbar>
        <div className={cx("scrollbar-inner") + " scrollbar-inner"}>
          <Card className="m-4">
            <CardHeader className="border-0 d-flex justify-content-between">
              <h3 className="mb-0 d-inline-block mr-5">
                Tất cả các doanh nghiệp
              </h3>
              <Row>
                <Button
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
                    Nhập doanh nghiệp từ file excel
                  </span>
                </Button>
                <Button
                  onClick={redirectAddEnterprise}
                  className={cx("btnAdd") + " btn-icon mx-5"}
                  color="excel"
                  type="button">
                  <span className="btn-inner--icon mr-1">
                    <img
                      src={require("~img/icons/common/icons8-plus.png")}
                      alt="icon-excel"
                    />
                  </span>
                  <span className="btn-inner--text text-white">
                    Thêm doanh nghiệp mới
                  </span>
                </Button>
              </Row>
            </CardHeader>

            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Tên Doanh nghiệp</th>
                  <th scope="col">Ngày đăng ký</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>

              <tbody className={cx("tbody") + " list"}>
                {isLoading ? (
                  <tr>
                    <td colSpan={6}>
                      <Loading />
                    </td>
                  </tr>
                ) : (
                  <></>
                )}

                {enterpriseList?.map((enterprise, index) => {
                  return (
                    <tr key={enterprise.id}>
                      <th scope="row">
                        {(paging.pagingIndex - 1) * pageAmount + index + 1}
                      </th>
                      <td>{enterprise.name}</td>
                      <td>
                        {format(
                          parse(
                            enterprise.issueDateBussinessLicenseNo,
                            "YYYY-MM-DD"
                          ),
                          "DD-MM-YYYY"
                        )}
                      </td>
                      {enterprise.status === "Đang hoạt động" ? (
                        <td className="text-success">{enterprise.status}</td>
                      ) : (
                        <td className="text-danger">{enterprise.status}</td>
                      )}

                      <td>
                        <Row>
                          <Col sm="9">
                            <Button
                              onClick={() =>
                                redirectUpdateEnterprise(enterprise.id)
                              }
                              type="button"
                              className="btn-success mx-1">
                              Sửa
                            </Button>
                            <Button
                              onClick={() => {
                                setIdDelete(enterprise.id);
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
                                    redirectEnterpriseDetail(enterprise.id)
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
                                    Xem các dự án
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
                                    Xem lao động
                                  </span>
                                  <FontAwesomeIcon
                                    icon={faUser}
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
              toggle={() => setIsOpenModalDelete(false)}
              className="modal-dialog-centered modal-secondary">
              <ModalHeader>Bạn có chắc chắn?</ModalHeader>
              <div className="modal-body">
                <form className="new-event--form">
                  <FormGroup>
                    <p>Những thông tin sau sẽ được xoá</p>
                  </FormGroup>
                </form>
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

export default EnterpriseList;
