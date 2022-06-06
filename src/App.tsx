import { HashRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { publicRoutes } from "./routes";

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

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme="light"
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          {publicRoutes.map((route: Route, index) => {
            let Layout: any = route.layout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  Layout ? (
                    <Layout title={route.title}>
                      <Page />
                    </Layout>
                  ) : (
                    <Page />
                  )
                }></Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
