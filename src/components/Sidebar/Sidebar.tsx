import React from "react";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  faBuilding,
  faChartSimple,
  faGear,
  faIndustry,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);
const menuDashboard = [
  {
    title: "Trang chủ",
    iconTitle: faChartSimple,
    to: "/dashboard",
  },
  {
    title: "Doanh nghiệp",
    iconTitle: faBuilding,
    to: "/enterprise",
  },
  {
    title: "Dự án",
    iconTitle: faIndustry,
    to: "/project",
  },
  {
    title: "Lao động",
    iconTitle: faUserAlt,
    to: "/employee",
  },
  {
    title: "Tài khoản",
    iconTitle: faUserAlt,
    to: "/account",
  },
];

function Sidebar() {
  return (
    <nav className="">
      <aside className={cx("wrapper")}>
        <PerfectScrollbar>
          <div className={cx("logoWrapper")}>
            <img className={cx("logoImg")} src="/img/logoSHTP.png" alt="" />
          </div>
          <div className={cx("menuWrapper")}>
            <ul className={cx("menuList")}>
              {menuDashboard.map((menuItem, index) => {
                return (
                  <NavLink
                    key={index}
                    className={(navData) =>
                      navData.isActive
                        ? cx("menuItem", "active")
                        : cx("menuItem")
                    }
                    to={menuItem.to}>
                    {<FontAwesomeIcon icon={menuItem.iconTitle} size="2x" />}
                    <span>{menuItem.title}</span>
                  </NavLink>
                );
              })}
              <NavLink
                className={cx("menuItem", "menuItemSetting")}
                to="/setting">
                <FontAwesomeIcon icon={faGear} size="2x" />
                <span>Cài đặt</span>
              </NavLink>
            </ul>
          </div>
        </PerfectScrollbar>
      </aside>
    </nav>
  );
}

export default Sidebar;
