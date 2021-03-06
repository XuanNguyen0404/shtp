import styles from "./SidebarEnterprise.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PerfectScrollbar from "react-perfect-scrollbar";
import { faBuilding, faGear, faFile } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);
const menuDashboard = [
  {
    title: "Doanh nghiệp",
    iconTitle: faBuilding,
    to: "/enterprise/information",
  },
  {
    title: "Báo cáo",
    iconTitle: faFile,
    to: "/enterprise/report",
  },
];

function SidebarEnterprise() {
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

export default SidebarEnterprise;
