import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import routeConfig from "./common/routeConfig";
import store from "./common/store";

function renderRouteConfigV3(routes, contextPath) {
  const { auth } = store.getState();
  const { headers } = auth;

  // Resolve route config object in React Router v3.
  const children = []; // children component list

  const renderRoute = (item, routeContextPath) => {
    let newContextPath;
    if (/^\//.test(item.path)) {
      newContextPath = item.path;
    } else {
      newContextPath = `${routeContextPath}/${item.path}`;
    }
    newContextPath = newContextPath.replace(/\/+/g, "/");
    if (item.component && item.childRoutes) {
      const childRoutes = renderRouteConfigV3(item.childRoutes, newContextPath);
      children.push(
        <Route
          key={newContextPath}
          render={(props) => {
            if (item.role === "protected" && headers.Authorization) {
              return <Redirect to={{ pathname: "/" }} />;
            } else if (item.role === "privated" && !headers.Authorization) {
              return <Redirect to={{ pathname: "/auth/login" }} />;
            } else {
              return <item.component {...props}>{childRoutes}</item.component>;
            }
          }}
          path={newContextPath}
        />
      );
    } else if (item.component) {
      children.push(
        <Route
          key={newContextPath}
          render={(props) => {
            if (item.role === "protected" && headers.Authorization) {
              return <Redirect to={{ pathname: "/" }} />;
            } else if (item.role === "privated" && !headers.Authorization) {
              return <Redirect to={{ pathname: "/auth/login" }} />;
            } else {
              return <item.component {...props} />;
            }
          }}
          path={newContextPath}
          exact
        />
      );
    } else if (item.childRoutes) {
      item.childRoutes.forEach((r) => renderRoute(r, newContextPath));
    }
  };

  routes.forEach((item) => renderRoute(item, contextPath));

  // Use Switch so that only the first matched route is rendered.
  return <Switch>{children}</Switch>;
}

export default function App() {
  const children = renderRouteConfigV3(routeConfig, "/");

  return <>{children}</>;
}
