import React from "react";
import Layout from "../../components/Layout";
import { getParams } from "../../utils/getParams";
import { ProductPage } from "./ProductPage";
import { ProductStore } from "./ProductStore";
import "./style.css";

export const ProductListPage = (props) => {
  const renderProduct = () => {
    const params = getParams(props.location.search);
    let content = null;
    switch (params.type) {
      case "store":
        content = <ProductStore {...props} />;
        break;

      case "page":
        content = <ProductPage {...props} />;
        break;

      default:
        break;
    }
    return content;
  };
  return (
    <Layout>
      {renderProduct()}
    </Layout>
  );
};
