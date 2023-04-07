import "./ShowProductsByCategories.css";

import axios from "axios";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { itemAddedToCartToastMessage } from "../../toastify/AllToastMessages";
import { ProductContext } from "../../utils/ProductContext";

const ShowProductsByCategories = (props) => {
  // Add to cart
  const { cart, setCart, addProduct } = useContext(ProductContext);

  const [myData, setMyData] = useState([]);

  const loadCategoryPage = (categoryId) => {
    // axios
    //   .get(`http://localhost:4040/products/categories/${props.id}`)
    //   .then((response) => {
    //     // props.setter(true);
    //     setMyData(response.data);
    //   })
    //   .catch((error) => setIsError(error.message));

    const options = {
      method: "GET",
      url: "http://localhost:4040/products/categories/" + props.id,
    };

    axios
      .request(options)
      .then(function (response) {
        setMyData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    loadCategoryPage();
  }, [props.id]);

  return (
    <Container
      fluid
      className=" align-items-center my-4 customer-homepage-main-container p-4 m-auto"
    >
      <Row className="mb-3 category-card-main-div justify-content-center justify align-items-center">
        {myData.map((data) => {
          return (
            <Col xs={12} sm={6} md={4} lg={3} className="my-4">
              <Link className="text-decoration-none ">
                <Card className=" border all_product_category_card border-white text-center">
                  <Link to={"/products/" + data._id}>
                    <Card.Img
                      variant="top"
                      ata-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="View details"
                      src={data.productImageUrl}
                      alt="product"
                      className="category-card-image px-3 pt-4"
                    />
                  </Link>

                  <Card.Body>
                    <Card.Title className=" card-title fs-6 mb-2">
                      {data.productName}
                    </Card.Title>

                    <p className=" py-2 fw-bold fst-italic">
                      <span className="me-2 px-2 py-1 bg-warning rounded-pill">
                        <i className="fa px-1 fa-gift" aria-hidden="true"></i>
                        {data.productOffers}
                      </span>

                      <span className="me-3 text-danger">
                        {" "}
                        &#x20B9; {data.productPrice}
                      </span>
                    </p>

                    <p className="text-warning">
                      <i
                        className="ps-2 fa fa-star fa-sm"
                        aria-hidden="true"
                      ></i>
                      <i
                        className="ps-2 fa fa-star fa-sm"
                        aria-hidden="true"
                      ></i>
                      <i
                        className="ps-2 fa fa-star fa-sm"
                        aria-hidden="true"
                      ></i>
                      <i
                        className="ps-2 fa fa-star fa-sm"
                        aria-hidden="true"
                      ></i>
                    </p>

                    <Link to={"/products/" + data._id}>
                      <Button
                        variant="outline-success rounded-pill me-3 mb-2"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="View details"
                      >
                        Details
                      </Button>
                    </Link>

                    {/* <Link to="">
                      <Button
                        variant="outline-warning rounded-pill me-3 mb-2"
                        ata-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Add to cart"
                        onClick={(e) => {
                          addToCart(e, myData);
                        }}
                      >
                        Add to cart
                      </Button>
                    </Link> */}
                    <Link to="">
                      <Button
                        variant="outline-warning rounded-pill me-3 mb-2"
                        ata-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Add to cart"
                        onClick={(e) => {
                          addProduct(data, itemAddedToCartToastMessage());
                        }}
                      >
                        Add to cart
                      </Button>
                    </Link>

                    <Link>
                      <Button
                        variant="outline-info rounded-pill me-3 mb-2"
                        ata-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Buy Now"
                      >
                        Buy Now
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ShowProductsByCategories;
