import DashboardLayout from "src/layouts/DashboardLayout/DashboardLayout";
import DefaultLayout from "src/layouts/DefaultLayout/DefaultLayout";
import DefaultLayoutEnterprise from "src/layouts/DefaultLayoutEnterprise/DefaultLayoutEnterprise";
import NoHeaderLayout from "src/layouts/NoHeaderLayout/NoHeaderLayout";
import AccountList from "src/views/pages/Account/AccountList/AccountList";
import DashboardEmployee from "src/views/pages/Dashboard/DashboardEmployee/DashboardEmployee";
import DashboardEnterprise from "src/views/pages/Dashboard/DashboardEnterprise/DashboardEnterprise";
import DashboardProject from "src/views/pages/Dashboard/DashboardProject/DashboardProject";
import EmployeeList from "src/views/pages/Employee/EmployeeList/EmployeeList";
import AddEnterprise from "src/views/pages/Enterprise/AddEnterprise/AddEnterprise";
import EnterpriseDetail from "src/views/pages/Enterprise/EnterpriseDetail/EnterpriseDetail";
import EnterpriseList from "src/views/pages/Enterprise/EnterpriseList/EnterpriseList";
import Report from "src/views/pages/EnterpriseRole/Report/Report";
import Login from "src/views/pages/Login/Login";
import AddProject from "src/views/pages/Project/AddProject/AddProject";
import ProjectDetail from "src/views/pages/Project/ProjectDetail/ProjectDetail";
import ProjectList from "src/views/pages/Project/ProjectList/ProjectList";


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
