import React from "react";
import styles from "./DashboardLayout.module.scss";
import classNames from "classnames/bind";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import faker from "faker";
import DashboardHeader from "../../views/pages/Dashboard/DashboardHeader/DashboardHeader";
import Sidebar from "~/components/Sidebar/Sidebar";

interface Props {
  title: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface Route {
  path: string;
  component: () => JSX.Element;
  title: string;
}
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(94,114,228)",
      backgroundColor: "rgb(94,114,228)",
      lineTension: 0.4,
    },
  ],
};

const cx = classNames.bind(styles);

function DashboardLayout(props: React.PropsWithChildren<Props>) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("sidebarWrapper")}>
          <Sidebar />
        </div>
        <div className={cx("mainContainer")}>
          <div className={cx("content")}>
            <div className={cx("wrapperDashboard")}>
              <div className={cx("containerHeader")}>
                <DashboardHeader></DashboardHeader>
              </div>
              <div className={cx("containerDashboard")}>
                <PerfectScrollbar>
                  <div className="scrollbar-inner">
                    {props.children}
                  </div>
                </PerfectScrollbar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
