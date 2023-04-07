import axios from "axios";
import moment from "moment/moment";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ProductContext } from "../../utils/ProductContext";

// import CartServices from "../service/CartServices";

function Order(props) {
  const { customerDetails } = useContext(ProductContext);
  console.log("Customer Details", customerDetails._id);
  const [product, setProducts] = useState([]);
  const [total, setTotal] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");

  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      console.log("customer Id", customerDetails._id);
      axios
        .get("http://localhost:4040/carts/customer/" + customerDetails._id)
        .then((response) => {
          console.log("Data : ", response.data);
          // console.log()
          setProducts(response.data);

          setTotal(0);
        });
    } catch (error) {}
  }, [customerDetails._id]);

  const saveOrder = () => {
    // const customerDetails = JSON.parse(localStorage.getItem("userinformation"));

    const myAddress =
      address + " " + city + " " + state + " " + country + " " + zip;

    const dataArray = [];

    product.map((item) => {
      const myData = {
        productId: item.products._id.productId._id,
        quantity: item.quantity,
      };
      dataArray.push(myData);
    });

    const data = {
      total: total,
      customerId: customerDetails._id,
      products: dataArray,
      order_status: "Ordered",
      shipping_address: "yaha",
    };
    console.log(data);
    axios.post("http://localhost:4040/orders/", data).then((res) => {
      console.log(res.data.customerId);
      if (res.data.customerId === customerDetails._id) {
        console.log("In post order");
        setStatus("Ordered");
        alert("Orderd successfull");
        // axios.delete(`http://localhost:4500/cart/deletecart/${customerId}`).then((res)=>{})
        // navigate("/orders/" + props.name._id);
      } else {
        alert("Something Went Wrong");
      }
      //     ? (alert("Orderd successfull"),
      //       axios.delete(`http://localhost:4500/cart/deletecart/${customerId}`).then((res)=>{
      //       }),
      //       navigate("/orderlist/"))
      //     : alert("Could not proceed , please try after some time.");
    });
  };

  return (
    <div className="container-fluid">
      <div className="row mx-5 py-5">
        <div className="col-lg-6 ">
          <h5 className="section-title position-relative text-uppercase mb-3">
            <span className="">Billing Address</span>
          </h5>
          <div className="mb-5 border border-info rounded p-5">
            <div className="row">
              <div className="col-md-6 mb-4 form-group">
                <label>Address Line 1</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="123 Street"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-4 form-group">
                <label>Address Line 2</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="123 Street"
                />
              </div>
              <div className="col-md-6 mb-4 form-group">
                <label>Country</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Select your country</option>
                  <option value="1">India</option>
                  <option value="2">USA</option>
                  <option value="3">Russia</option>
                </select>
              </div>
              <div className="col-md-6 mb-4 form-group">
                <label>City</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="New York"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-4 form-group">
                <label>State</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="New York"
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-4 form-group">
                <label>ZIP Code</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="123"
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 align-self-center">
          <h5 className="section-title position-relative text-uppercase mb-3">
            <span className="">Order Total</span>
          </h5>
          <div className="mb-5 border border-info rounded p-3">
            <div className="border-bottom">
              <h6 className="mb-3 fst-italic fw-bolder fs-3 text-warning">
                Products
              </h6>
              {product[0] ? (
                <>
                  {product.map((data, ind) => {
                    return (
                      <div className="fluid float-center m-2">
                        <h1 className="text-center mt-3">
                          Customer Orders List
                        </h1>

                        <table class="table border border-dark">
                          <thead class="thead-dark">
                            <tr>
                              <th>
                                <th className="pl-5">Product</th>
                                <th className="pl-5">Price</th>
                                <th className="pl-5">Quantity</th>
                              </th>
                              <th>Total</th>
                              <th>Date</th>
                            </tr>
                          </thead>
                          <tbody className="">
                            <tr>
                              <td>
                                {data.products.map((subdata, ind) => {
                                  return (
                                    <tr key={ind}>
                                      <td className="pl-4">
                                        {subdata.productId.productName}
                                      </td>
                                      <td className="pl-4">
                                        {subdata.productId.productPrice}
                                      </td>
                                      <td className="pl-4">
                                        {subdata.quantity}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </td>
                              <td>
                                <h6>{data.total}</h6>
                              </td>
                              <td>
                                {moment(data.updatedDate)
                                  .utc()
                                  .format("DD/MM/YY")}
                              </td>
                              {/* <td>
                                    <button className="btn btn-sm btn-danger">
                                      <i className="fa fa-times"></i>
                                    </button>
                                  </td> */}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    );
                  })}
                </>
              ) : (
                "Order Yet To Load"
              )}
            </div>
          </div>
          <div class="mb-5 border border-info p-2 rounded">
            <h5 class="section-title position-relative text-uppercase mb-3">
              <span class="text-info">Payment</span>
            </h5>
            <div class="bg-light rounded p-2">
              <div class="form-group">
                <div class="custom-control custom-radio">
                  <input
                    type="radio"
                    class="custom-control-input"
                    name="payment"
                    id="paypal"
                  />
                  <label class="custom-control-label" for="paypal">
                    Cash On Delivery
                  </label>
                </div>
              </div>

              <button
                class="btn btn-block btn-primary font-weight-bold my-3"
                onClick={saveOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
