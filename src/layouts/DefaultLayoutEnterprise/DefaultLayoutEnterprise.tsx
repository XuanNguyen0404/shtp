import React from "react";

import classNames from "classnames/bind";
import Header from "../../components/Header/Header";
import styles from "./DefaultLayoutEnterprise.module.scss";
import SidebarEnterprise from "src/components/SidebarEnterprise/SidebarEnterprise";
const cx = classNames.bind(styles);

interface Props {
  title: string;
  isSearch: boolean;
}



function DefaultLayoutEnterprise(props: React.PropsWithChildren<Props>) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("sidebarWrapper")}>
          <SidebarEnterprise />
        </div>
        <div className={cx("mainContainer")}>

          <div className={cx("headerWrapper")}>
            <Header title={props.title} isSearch={true}></Header>
          </div>
          <div className={cx("content")}>{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default DefaultLayoutEnterprise;
