import React from "react";

import classNames from "classnames/bind";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./DefaultLayout.module.scss";
const cx = classNames.bind(styles);

interface Props {
  title: string;
  isSearch: boolean;
}

function DefaultLayout(props: React.PropsWithChildren<Props>) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("sidebarWrapper")}>
          <Sidebar />
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

export default DefaultLayout;
