import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import {
  addBreadcrumb,
  removeBreadcrumb,
  setBreadcrumbs,
} from "../../slices/breadcrumbsSlice";
import style from "./BreadCrumbs.module.css";

const BreadCrumbs = ({ data }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const breadcrumbs = useSelector((state) => state.breadcrumbs.breadcrumbsList);

  let routesMap = {
    "/categories/all": "Categories",
    "/categories/:id": "Categories",
  };

  const categoriesMap = {
    1: "Annual",
  };

  const newBreadcrumb = { [data.id]: data.title };
  routesMap = { ...routesMap, ...newBreadcrumb };

  const defaultPath = { name: "Main page", path: "" };

  useEffect(() => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    const newBreadcrumbs = pathnames.map((pathname) => {
      return {
        name: routesMap[pathname] || pathname,
        path: pathname === "/categories/:id" ? "/categories/all" : pathname,
      };
    });

    console.log(data, routesMap[data.categoryId]);

    if (pathnames.includes("/product/:id")) {
      const singleProductsBreadcrumbs = [
        defaultPath,
        { name: "Categories", path: "/categories/all" },
        {
          name: categoriesMap[data.categoryId],
          path: `categories/${data.categoryId}`,
        },
      ];
      dispatch(
        setBreadcrumbs([...singleProductsBreadcrumbs, ...newBreadcrumbs])
      );
    } else {
      dispatch(setBreadcrumbs([defaultPath, ...newBreadcrumbs]));
    }
  }, [location, dispatch, data, routesMap]);

  const handleAddBreadcrumb = () => {
    const newBreadcrumb = breadcrumbs.length + 1;
    dispatch(addBreadcrumb(newBreadcrumb));
  };

  const handleRemoveBreadcrumb = () => {
    if (breadcrumbs.length > 0) {
      dispatch(removeBreadcrumb(breadcrumbs.length - 1));
    }
  };

  return (
    <div className={style.buttonWrapper}>
      <div>
        {breadcrumbs.map((breadcrumb, index) => (
          <Link to={`/${breadcrumb.path}`} key={index}>
            <div>{breadcrumb.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export { BreadCrumbs };
