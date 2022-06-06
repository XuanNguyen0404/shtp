import DashboardEnterprise from "~/views/pages/Dashboard/DashboardEnterprise/DashboardEnterprise";

interface Props {
    title: string;
}
interface Route {
    path: string;
    component: () => JSX.Element;
    title: string;
}

const dashboardRoutes: Route[] = [
    { path: "/Dashboard/enterprise", component: DashboardEnterprise, title: "Trang chủ" },
    { path: "/Dashboard/employee", component: DashboardEnterprise, title: "Trang chủ" },
    { path: "/Dashboard/project", component: DashboardEnterprise, title: "Trang chủ" },
]

export {dashboardRoutes} ;