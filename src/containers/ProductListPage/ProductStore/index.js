import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import { generatePublicUrl } from "../../../urlConfig";
import { Link } from "react-router-dom";
import { Card } from "../../../components/UI/Card";

export const ProductStore = (props) => {
  const product = useSelector((state) => state.product);
  const priceRange = product.priceRange;
  const dispatch = useDispatch();
  const { match } = props;

  useEffect(() => {
    dispatch(getProductsBySlug(match.params.slug));
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        
        return (
           (product.productsByPrice[key].length >0 && 
            <Card
              key={index}
              className="card"
              priceRange={priceRange[key]}
              headerLeft={`${match.params.slug} under $ ${priceRange[key]}`}
              headerRight={<button>view all</button>}
              style={{
                width: "calc(100% - 40px)",
              margin: "20px",
              }}
            >
              <div style={{ display: "flex" }}>
                {product.productsByPrice[key].map((product) => (
                  <Link
                    to={`/${product.slug}/${product._id}/p`}
                    style={{ display: "block" }}
                    key={product._id}
                    className="productContainer"
                  >
                    <div className="productImgContainer">
                      <img
                        src={generatePublicUrl(product.productPictures[0].img)}
                        alt=""
                      />
                    </div>
                    <div className="productInfo">
                      <div style={{ margin: "5px 0" }}>{product.name}</div>
                      <div>
                        <span>4.3</span>
                        <span>3353</span>
                      </div>
                      <div className="productPrice">{product.price}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          )
        );
      })}
    </>
  );
};
