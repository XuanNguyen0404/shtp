import React from "react";
import NoHeaderLayout from "~/layouts/NoHeaderLayout/NoHeaderLayout";
import DashboardLayout from "~/layouts/DashboardLayout/DashboardLayout";
import AccountList from "~/views/pages/Account/AccountList/AccountList";
import EmployeeList from "~/views/pages/Employee/EmployeeList/EmployeeList";
import EnterpriseList from "~/views/pages/Enterprise/EnterpriseList/EnterpriseList";
import AddProject from "~/views/pages/Project/AddProject/AddProject";
import ProjectDetail from "~/views/pages/Project/ProjectDetail/ProjectDetail";
import ProjectList from "~/views/pages/Project/ProjectList/ProjectList";
import EnterpriseDetail from "~/views/pages/Enterprise/EnterpriseDetail/EnterpriseDetail";
import AddEnterprise from "~/views/pages/Enterprise/AddEnterprise/AddEnterprise";
import DashboardEnterprise from "~/views/pages/Dashboard/DashboardEnterprise/DashboardEnterprise";
import DashboardEmployee from "~/views/pages/Dashboard/DashboardEmployee/DashboardEmployee";
import DashboardProject from "~/views/pages/Dashboard/DashboardProject/DashboardProject";
import Login from "~/views/pages/Login/Login";
import DefaultLayout from "~/layouts/DefaultLayout/DefaultLayout";
import Report from "~/views/pages/EnterpriseRole/Report/Report";
import DefaultLayoutEnterprise from "~/layouts/DefaultLayoutEnterprise/DefaultLayoutEnterprise";

interface Props {
  title: string;
  isSearch: boolean;
}
interface Route {
  path: string;
  component: () => JSX.Element;
  title?: string;
  layout?: (props: React.PropsWithChildren<Props>) => JSX.Element;
}

const publicRoutes: Route[] = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    component: Login,
  },
  {
    path: "/dashboard",
    component: DashboardEnterprise,
    title: "Trang Chủ",
    layout: DashboardLayout,
  },
  {
    path: "/dashboard/enterprise",
    component: DashboardEnterprise,
    title: "Trang Chủ",
    layout: DashboardLayout,
  },
  {
    path: "/dashboard/employee",
    component: DashboardEmployee,
    title: "Trang Chủ",
    layout: DashboardLayout,
  },
  {
    path: "/dashboard/project",
    component: DashboardProject,
    title: "Trang Chủ",
    layout: DashboardLayout,
  },
  {
    path: "/enterprise",
    component: EnterpriseList,
    title: "Doanh nghiệp",
    layout: DefaultLayout,
  },
  {
    path: "/add-enterprise",
    component: AddEnterprise,
    title: "Thêm doanh nghiệp",
    layout: NoHeaderLayout,
  },
  {
    path: "/detail-enterprise",
    component: EnterpriseDetail,
    title: "Chi tiết doanh nghiệp",
    layout: NoHeaderLayout,
  },
  {
    path: "/project",
    component: ProjectList,
    title: "Dự án",
    layout: DefaultLayout,
  },
  {
    path: "/add-project",
    component: AddProject,
    title: "Thêm dự án mới",
    layout: NoHeaderLayout,
  },
  {
    path: "/detail-project",
    component: ProjectDetail,
    title: "Chi tiết dự án",
    layout: NoHeaderLayout,
  },
  {
    path: "/employee",
    component: EmployeeList,
    title: "Lao động",
    layout: DefaultLayout,
  },
  {
    path: "/account",
    component: AccountList,
    title: "Tài khoản",
    layout: DefaultLayout,
  },
  {
    path: "/enterprise/report",
    component: Report,
    title: "Báo cáo",
    layout: DefaultLayoutEnterprise,
  },
];

const privateRoutes: Route[] = [];

export { publicRoutes, privateRoutes };
