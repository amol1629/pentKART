import "../../cards/categorycards/CategoriesCard.css";

import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { BASE_URL } from "../../../utils/BaseUrl";
import { ProductContext } from "../../../utils/ProductContext";
import ShowProductsByBrands from "../../displayproductsbybrand/ShowProductsByBrands";

const BrandCards = () => {
  const { cart, customerStatus, customerDetails, customerStatusSetter } =
    useContext(ProductContext);
  console.log("customer status : ", customerStatus);
  const [myBrands, setMyBrands] = useState([]);
  const [isError, setIsError] = useState("");

  const [productId, setProductId] = useState("64200866eba8f0796dfa6ae9");

  function setIdfunction(_id) {
    setProductId(_id);
    console.log("Home page", setProductId);
  }

  const loadAllBrands = () => {
    axios
      .get(`${BASE_URL}productbrands`)
      .then((response) => setMyBrands(response.data))
      .catch((error) => setIsError(error.message));
  };

  useEffect(() => {
    loadAllBrands();
  }, []);
  return (
    <Container fluid>
      <Row className="justify-content-center mb-2">
        {myBrands.slice(0, 6).map((data, key) => {
          return (
            <Col
              key={key}
              className="my-4 customer-home-card text-center py-3 mx-3 mb-4"
              md={3}
              onClick={(e) => {
                setIdfunction(data._id);
              }}
            >
              <Link className="text-decoration-none" onClick={(e) => {}}>
                <img
                  src={data.brandImageUrl}
                  className="image-fluid"
                  // onClick={(e) => setElectronics(true)}
                  alt="brand"
                />
                <h5 className="mt-3 text-center card-title">
                  {data.brandName}
                </h5>
              </Link>
            </Col>
          );
        })}
      </Row>

      <Row>
        <Col className="mx-2 align-self-center">
          <ShowProductsByBrands id={productId} />
        </Col>
      </Row>
    </Container>
  );
};

export default BrandCards;
