import { createRoot } from "react-dom/client";
import "./index.css";
import store from "./store/store.js";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "./App.jsx";
import Portfolio from "./pages/front-end/portfolio/Portfolio.jsx";

import { Admin, EditSkill, EditProject } from "./pages/back-end";
import {
  AuthLayout,
  Error_404,
  Skill,
  SkillFrom,
  Project,
  Form,
  Login,
} from "./components/back-end/index.js";

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Portfolio />} />
      <Route path="*" element={<Error_404 />} />
      <Route path="/admin" element={<Admin />} />
      <Route
        path="/login"
        element={
          <AuthLayout authenticate={false}>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="/add-project"
        element={
          <AuthLayout authenticate>
            <Form />
          </AuthLayout>
        }
      />

      <Route
        path="/project/:projectId"
        element={
          <AuthLayout authenticate>
            <Project />
          </AuthLayout>
        }
      />
      <Route
        path="/edit-project/:projectId"
        element={
          <AuthLayout authenticate>
            <EditProject />
          </AuthLayout>
        }
      />
      <Route
        path="/add-skill"
        element={
          <AuthLayout authenticate>
            <SkillFrom />
          </AuthLayout>
        }
      />
      <Route
        path="/skill/:skillId"
        element={
          <AuthLayout authenticate>
            <Skill />
          </AuthLayout>
        }
      />
      <Route
        path="/edit-skill/:skillId"
        element={
          <AuthLayout authenticate>
            <EditSkill />
          </AuthLayout>
        }
      />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={route} />
  </Provider>
);
