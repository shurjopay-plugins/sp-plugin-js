![image](https://user-images.githubusercontent.com/57352037/170198396-932692aa-3354-4cf0-abc1-2b8ef43a6de3.png)

# ShurjoPay

Shurjopay JavaScript integration steps

## Prerequisite

To integrate ShurjoPay you need few credentials to access shurjopay:

```
:param prefix: Any string not more than 5 characters. It distinguishes the stores of a merchant.
:param currency: ISO format,(only BDT and USD are allowed).
:param return_url: Merchant should provide a GET Method return url to verify users initiated transaction status.
:param cancel_url: Merchant should provide a cancel url to redirect the user if he/she cancels the transaction in midway.
:param client_ip: User's ip
:param username: Merchant Username provided by shurjopay.
:param password: Merchant Password provided by shurjopay.
:param post_address: Live shurjopay version 2 URL.
```

> 📝 **NOTE** For shurjoPay version 2 live engine integration's all necessary credential will be given to merchant after subscription completed on shurjoPay gateway.

## Install

```shell
# npm versions > 5
npm i sp-plugin-js
```

## Checkout, Verify

- Generate token for merchants
- perform checkout
- Check order status
- Verify order id

Loading the module gets us a factory function, calling it instantiates the module.

```javascript
import { makePayment, paymentStatus, verifyPayment } from "sp-plugin-js";
```

The object provides methods that you need to use are:

- Payment operation methods: `checkout`, `verify`, `check_status`.
- Configuration methods: `.env`

#### In your route controllers, your workflow is (using three routes):

- At checkout->payment method, selecting shurjopay lands the buyer in _checkout_action_ route, where you initiate the transaction with cart details
- At first configure the shurjopay object to set the merchant info
- Then set the checkout_return and checkout_cancel callback url
- Then set the session accessor
- Then set error handlers, checkout callback
- Then call the checkout method

At first, you need to configure the object. The minimum environment variables that your site need to maintain(config related to shurjopay) are:

```Config:
{
  SHURJOPAY_URL: "",
  SHURJOPAY_USER_NAME: "",
  SHURJOPAY_PASSWORD: "",
  SHURJOPAY_PREFIX: "",
  SHURJOPAY_RETURN_URL: "",
  SHURJOPAY_CANCEL_URL: "",
};
```

```request payment
{
  amount: "12",
  currency : "BDT",
  customer_address : "7/12C, Block-B, Lalmatia, Dhaka-1207",
  customer_city : "Dhaka",
  customer_email : "sqx@xssxkj.com",
  customer_name : "Saiful Islam Shanto",
  customer_phone : "+8801516173249",
  customer_post_code : "1207"
};
```

### An example route controller

### Response format examples

#### verify

```javascript
response_data = [
  {
    id: 3741,
    order_id: "sp61e678dd003c6",
    currency: "BDT",
    amount: 500,
    payable_amount: 500,
    discsount_amount: null,
    disc_percent: 0,
    usd_amt: 0,
    usd_rate: 0,
    card_holder_name: null,
    card_number: null,
    phone_no: "01534303074",
    bank_trx_id: "61e678eb",
    invoice_no: "sp61e678dd003c6",
    bank_status: "Success",
    customer_order_id: "c4xyxpytzk00",
    sp_code: 1000,
    sp_massage: "Success",
    name: "Shanto",
    email: null,
    address: "330 NIH BUT DHK",
    city: "Dhaka",
    value1: null,
    value2: null,
    value3: null,
    value4: null,
    transaction_status: null,
    method: "Nagad",
    date_time: "2022-11-18 14:23:07",
  },
];
```

#### check_status

```javascript
[
  {
    id: 3754,
    order_id: "sp61e69482835b5",
    currency: "BDT",
    amount: 500,
    payable_amount: 500,
    discsount_amount: null,
    disc_percent: 0,
    usd_amt: 0,
    usd_rate: 0,
    card_holder_name: null,
    card_number: null,
    phone_no: "01534303074",
    bank_trx_id: "61e6948f",
    invoice_no: "sp61e69482835b5",
    bank_status: "Success",
    customer_order_id: "dvijbs4f5s00",
    sp_code: 1000,
    sp_massage: "Success",
    name: "Shanto",
    email: null,
    address: "330 NIH BUT DHK",
    city: "Dhaka",
    value1: null,
    value2: null,
    value3: null,
    value4: null,
    transaction_status: null,
    method: "Nagad",
    date_time: "2022-11-18 16:21:03",
  },
];
```

#### checkout

```javascript
response_data = {
  checkout_url:
    "https://sandbox.securepay.shurjopayment.com/spaycheckout/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc2FuZGJveC5zaHVyam9wYXltZW50LmNvbVwvYXBpXC9sb2dpbiIsImlhdCI6MTY0MjQ5NTk3MiwiZXhwIjoxNjQyNDk5NTcyLCJuYmYiOjE2NDI0OTU5NzIsImp0aSI6Im1JcEFrNHJPZ1h4TklWVG4iLCJzdWIiOjEsInBydiI6IjgwNWYzOWVlZmNjNjhhZmQ5ODI1YjQxMjI3ZGFkMGEwNzZjNDk3OTMifQ.k_RnbXwWIEc8_NiGgR3c3d0GQhASXv_fjK2S_Wz_Ksw&order_id=sp61e67fe5a7a17",
  amount: 500,
  currency: "BDT",
  sp_order_id: "sp61e67fe5a7a17",
  customer_order_id: "aobws09sa800",
  customer_name: "Shanto",
  customer_address: "330 NIH BUT DHK",
  customer_city: "Dhaka",
  customer_phone: "01534303074",
  customer_email: null,
  client_ip: "unknown",
  intent: "sale",
  transactionStatus: "Initiated",
};
```

### Docs/Usage

Example integration use case scenario is expressCart(https://github.com/.........)

### Postman Documentations

    This document will illustrate the overall request and response flow.
    URL : https://documenter.getpostman.com/view/6335853/U16dS8ig

### Who do I talk to?

    For any technical assistance please contact to: https://shurjopay.com.bd/#contacts
