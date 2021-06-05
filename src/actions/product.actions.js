import axiosInstance from "../helpers/axios";
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axiosInstance.get(`/products/${slug}`);
    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG,
        payload: res.data,
      });
    }
  };
};

export const getProductPage = (payload) => {
  return async (dispatch) => {
    try {
      const {cid,type} = payload.params
      dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });
      const res = await axiosInstance.get(`/page/${cid}/${type}`);
      if (res.status === 200) {
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
          payload: { page: res.data.page },
        });
      } else {
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
          payload: { error: res.data.error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductDetailsById = (payload) => {
  return async dispatch => {
      dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
      let res;
      try {
          const { productId } = payload.params;
          res = await axiosInstance.get(`/product/${productId}`);
          dispatch({
              type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
              payload: { productDetails: res.data.result }
          });

      } catch(error) {
          console.log(error);
          dispatch({
              type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
              payload: { error: res.data.error }
          });
      }

  }
}