import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import BrandCards from "../cards/brandscad/BrandCards";
import CategoriesCard from "../cards/categorycards/CategoriesCard";

const CustomerHomePage = () => {
  return (
    <Container fluid>
      {/* Top Brands */}
      <Row>
        <Col className="categorycard-row align-self-center my-2">
          <h1 className="py-3 text-center category-card-section-heading">
            Top Brands
          </h1>
          <BrandCards />
        </Col>
      </Row>

      {/* Top Categories */}
      <Row>
        <Col className="categorycard-row align-self-center my-2">
          <h1 className="py-3 text-center category-card-section-heading">
            Top Categories
          </h1>
          <CategoriesCard />
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerHomePage;
