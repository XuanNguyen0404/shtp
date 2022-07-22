import styles from "./AccountList.module.scss";
import classNames from "classnames/bind";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
    faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
} from "reactstrap";


const cx = classNames.bind(styles);

type Status = "Đang hoạt động" | "Ngưng hoạt động";

interface Account {
    name: string;
    nameEnterprise: string;
    status: Status;
}

const accountList: Account[] = [
    {
        name: "ftown-1@shtpmanagement",
        nameEnterprise: "FPT Software",
        status: "Đang hoạt động",
    },
    {
        name: "ftown-1@shtpmanagement",
        nameEnterprise: "FPT Software",
        status: "Đang hoạt động",
    },
    {
        name: "ftown-1@shtpmanagement",
        nameEnterprise: "FPT Software",
        status: "Đang hoạt động",
    },
    {
        name: "ftown-1@shtpmanagement",
        nameEnterprise: "FPT Software",
        status: "Đang hoạt động",
    },
    {
        name: "ftown-1@shtpmanagement",
        nameEnterprise: "FPT Software",
        status: "Đang hoạt động",
    },
    {
        name: "ftown-1@shtpmanagement",
        nameEnterprise: "FPT Software",
        status: "Đang hoạt động",
    },
    {
        name: "ftown-1@shtpmanagement",
        nameEnterprise: "FPT Software",
        status: "Đang hoạt động",
    },
    {
        name: "ftown-1@shtpmanagement",
        nameEnterprise: "FPT Software",
        status: "Đang hoạt động",
    },
    {
        name: "ftown-1@shtpmanagement",
        nameEnterprise: "FPT Software",
        status: "Ngưng hoạt động",
    },
    {
        name: "ftown-1@shtpmanagement",
        nameEnterprise: "FPT Software",
        status: "Đang hoạt động",
    },
];

function AccountList() {
    return (
        <div className={cx("wrapper")}>
            <PerfectScrollbar>
                <div className={cx("scrollbar-inner") + " scrollbar-inner"}>
                    <Card className="m-4">
                        <CardHeader className="border-0 d-flex justify-content-between">
                            <h3 className="mb-0 d-inline-block mr-5">
                                Tất cả các tài khoản
                            </h3>
                            <Row>
                                <Button
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
                                        Cấp tài khoản cho doanh nghiệp
                                    </span>
                                </Button>
                            </Row>
                        </CardHeader>

                        <Table
                            className="align-items-center table-flush"
                            responsive>
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên tài khoản</th>
                                    <th scope="col">Tên tổ chức kinh tế</th>
                                    <th scope="col">Trạng thái</th>
                                    <th scope="col">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="list">
                                {accountList.map((account, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{account.name}</td>
                                            <td>{account.nameEnterprise}</td>
                                            {account.status ===
                                            "Đang hoạt động" ? (
                                                <td className="text-success">
                                                    {account.status}
                                                </td>
                                            ) : (
                                                <td className="text-danger">
                                                    {account.status}
                                                </td>
                                            )}
                                            <td>
                                                <Row>
                                                    <Col>
                                                        <Button
                                                            type="button"
                                                            className="btn-success mx-1">
                                                            Cấp lại mật khẩu
                                                        </Button>
                                                    </Col>

                                                    <Col className="d-flex justify-content-center align-items-center">
                                                        <UncontrolledDropdown>
                                                            <DropdownToggle tag="a">
                                                                <FontAwesomeIcon
                                                                    className={cx(
                                                                        "smMenu"
                                                                    )}
                                                                    icon={
                                                                        faEllipsisV
                                                                    }></FontAwesomeIcon>
                                                            </DropdownToggle>
                                                            <DropdownMenu></DropdownMenu>
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
                                            <span className="sr-only">
                                                Previous
                                            </span>
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem className="active">
                                        <PaginationLink
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}>
                                            1
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}>
                                            2{" "}
                                            <span className="sr-only">
                                                (current)
                                            </span>
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}>
                                            3
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}>
                                            <i className="fas fa-angle-right" />
                                            <span className="sr-only">
                                                Next
                                            </span>
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

export default AccountList;
