import React from "react";
import "../App.css";
import Home from "../components/Home";
import Category from "../components/Category";
import Cat from "../components/Cat";
import { Container, Row, Col } from "reactstrap";

export default function Homepage() {
  return (
    <div>
      <Home />
      <br />
      <Cat />
      <br />
      <br />
      <Container className="alligning">
        <Row>
          <Col xs={6} md={4}>
            <Category
              picture="https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              title="Furnitures"
            />
          </Col>
          <Col xs={6} md={4}>
            <Category
              picture="https://cdn.pixabay.com/photo/2014/08/11/21/39/wall-416060__480.jpg"
              title="Rooms"
            />
          </Col>
          <Col xs={6} md={4}>
            <Category
              picture="https://cdn.pixabay.com/photo/2016/02/11/15/32/skull-1193784__480.jpg"
              title="Stationery Items"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
