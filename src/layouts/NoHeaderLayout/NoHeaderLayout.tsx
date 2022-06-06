import React from "react";
import styles from "./NoHeaderLayout.module.scss";
import classNames from "classnames/bind";
import Sidebar from "src/components/Sidebar/Sidebar";
const cx = classNames.bind(styles);

interface Props {
    title: string;
    isSearch: boolean;
}

function NoHeaderLayout(props: React.PropsWithChildren<Props>){
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("sidebarWrapper")}>
                    <Sidebar />
                </div>
                <div className={cx("mainContainer")}>
                    <div className={cx("content")}>{props.children}</div>
                </div>
            </div>
        </div>
    );
}

export default NoHeaderLayout;
