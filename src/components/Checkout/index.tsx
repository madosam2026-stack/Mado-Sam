"use client";
import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Login from "./Login";
import Shipping from "./Shipping";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import Coupon from "./Coupon";
import Billing from "./Billing";

const Checkout = () => {
  return (
    <>
      <Breadcrumb title={"Checkout"} pages={["checkout"]} />
   <section>hello</section>
    </>
  );
};

export default Checkout;
