// import {authentication,makePayment,verifyPayment,paymentStatus} from '../Shurjopay.js'
import { makePayment, paymentStatus, verifyPayment } from "../Shurjopay.js";

makePayment(
  {
    amount: "10",
    order_id: "sp315689",
    customer_name: "ATM Fahim",
    customer_address: "Dhaka",
    customer_phone: "01534303074",
    customer_city: "Dhaka",
    customer_post_code: "1212",
    client_ip: "102.101.1.1",
  },
  function (checkout_url, resp_data) {
    console.log("checkout url is " + checkout_url);

    verifyPayment((resp_data) => {
      console.log("verify");
      console.dir(resp_data);
    });
    paymentStatus((resp_data) => {
      console.log("check status");
      console.dir(resp_data);
    });
  }
);
