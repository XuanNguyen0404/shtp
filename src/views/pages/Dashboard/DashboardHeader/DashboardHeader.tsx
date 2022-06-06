import { NavLink } from "react-router-dom";
import styles from "./DashboardHeader.module.scss";
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  ListGroup,
  ListGroupItem,
  DropdownItem,
  Nav,
  Media,
  Card,
  CardTitle,
  CardBody,
} from "reactstrap";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const menuDashboard = [
  {
    title: "Số lượng doanh nghiệp",
    total: 200,
    to: "/dashboard/enterprise",
  },
  {
    title: "Số lượng lao động",
    total: 168960,
    to: "/dashboard/employee",
  },
  {
    title: "Số lượng dự án",
    total: 157,
    to: "/dashboard/project",
  },
];

function DashboardHeader() {
  return (
    <header className={cx("wrapper")}>
      <Row>
        <Col md="3">
          <div className={cx("titleWrapper")}>
            <span className={cx("title")}>Trang chủ</span>
          </div>
        </Col>
        <Col md="6"></Col>
        <Col md="3">
          <div className={cx("profileWrapper")}>
            <div className={cx("notificationWrapper")}>
              <UncontrolledDropdown nav>
                <DropdownToggle className="nav-link" color="" tag="a">
                  <i
                    className="ni ni-bell-55"
                    style={{ color: "white", cursor: "pointer" }}
                  />
                </DropdownToggle>
                <DropdownMenu
                  className="dropdown-menu-xl py-0 overflow-hidden"
                  right>
                  <div className="px-3 py-3">
                    <h6 className="text-sm text-muted m-0">
                      You have <strong className="text-info">13</strong>{" "}
                      notifications.
                    </h6>
                  </div>

                  <ListGroup flush>
                    <ListGroupItem
                      className="list-group-item-action"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      tag="a">
                      <Row className="align-items-center">
                        <Col className="col-auto">
                          <img
                            alt="..."
                            className="avatar rounded-circle"
                            src={require("src/assets/img/theme/team-1.jpg")}
                          />
                        </Col>
                        <div className="col ml--2">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h4 className="mb-0 text-sm">John Snow</h4>
                            </div>
                            <div className="text-right text-muted">
                              <small>2 hrs ago</small>
                            </div>
                          </div>
                          <p className="text-sm mb-0">
                            Let's meet at Starbucks at 11:30. Wdyt?
                          </p>
                        </div>
                      </Row>
                    </ListGroupItem>
                  </ListGroup>

                  <DropdownItem
                    className="text-center text-info font-weight-bold py-3"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}>
                    Hiện tất cả
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <div className={cx("userWrapper")}>
              <Nav className="align-items-center ml-auto ml-md-0" navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle className="nav-link pr-0" color="" tag="a">
                    <Media className="align-items-center">
                      <span className="avatar avatar-sm rounded-circle">
                        <img alt="..." src={require("src/assets/img/theme/team-4.jpg")} />
                      </span>
                      <Media className="ml-2 d-none d-lg-block">
                        <span
                          className="mb-0 text-sm font-weight-bold"
                          style={{ color: "white" , cursor : 'pointer'}}>
                          Nguyễn Văn An
                        </span>
                      </Media>
                    </Media>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem className="noti-title" header tag="div">
                      <h6 className="text-overflow m-0">Welcome!</h6>
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}>
                      <i className="ni ni-single-02" />
                      <span>My profile</span>
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}>
                      <i className="ni ni-settings-gear-65" />
                      <span>Settings</span>
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}>
                      <i className="ni ni-calendar-grid-58" />
                      <span>Activity</span>
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}>
                      <i className="ni ni-support-16" />
                      <span>Support</span>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}>
                      <i className="ni ni-user-run" />
                      <span>Logout</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        {menuDashboard.map((menuItem, index) => {
          return (
            <Col sm="4" className="px-4" key={index}>
              <NavLink
                className={(navData) =>
                  navData.isActive ? cx("menuItem", "active") : cx("menuItem")
                }
                to={menuItem.to}>
                <Card className={cx("card")}>
                  <CardTitle className={cx("cardTitle") + " text-center"}>
                    <span className={cx("spanCardTitle")}>
                      {menuItem.title}
                    </span>
                  </CardTitle>
                  <CardBody className={cx("cardBody") + " text-center"}>
                    <span className={cx("spanCardBody")}>{menuItem.total}</span>
                  </CardBody>
                </Card>{" "}
              </NavLink>
            </Col>
          );
        })}
      </Row>
    </header>
  );
}

export default DashboardHeader;
