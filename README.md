# ![shurjoPay](https://shurjopay.com.bd/dev/images/shurjoPay.png) JavaScript plugin package

![Made With](https://badgen.net/badge/Made%20with/javascript)
[![Test Status](https://github.com/rust-random/rand/workflows/Tests/badge.svg?event=push)]()
![NPM](https://img.shields.io/npm/l/sp-plugin)
![version](https://badgen.net/badge/version/0.1.0)

Official shurjoPay JavaScript package (plugin) for merchants or service providers to connect with [**_shurjoPay_**](https://shurjopay.com.bd) Payment Gateway v2.1 developed and maintained by [_**ShurjoMukhi Limited**_](https://shurjomukhi.com.bd).

This plugin package can be used with any javascript application or framework (e.g. React, vue.js, Angular etc).
Also it makes it easy for developers to integrate with shurjoPay v2.1 with just three API calls:

1. **makePayment**: create and send payment request
1. **verifyPayment**: verify payment status at shurjoPay
1. **paymentStatus**: Check payment details and status

Also reduces many of the things that you had to do manually

- Handles http request and errors
- JSON serialization and deserialization
- Authentication during checkout and verification of payments

## Audience

This document is intended for the developers and technical personnel of merchants and service providers who want to integrate the shurjoPay online payment gateway using javascript.

# How to use this shurjoPay Plugin

To integrate the shurjoPay Payment Gateway in your JavaScript project do the following tasks sequentially.

#### Step 1: Install the plugin inside your project environment

```
npm install shurjopay-js
```

#### Step 2: Import the functions from package in your code as necessary and initiate payment method.

```javaScript
import {  makePayment, paymentStatus, verifyPayment } from "shurjopay-js";
```

```javaScript
 const makePayment_details= await makePayment(your_order_id, form_data);
 const { checkout_url } = makePayment_details;
```

Checkout this [react project](https://github.com/shurjopay-plugins/sp-plugin-usage-examples/tree/dev/react-app-js-plugin) to see this plugin in action.

#### Step 3: Setup configuration parameters for shurjopay plugin correctly in your application.

e.g. API endpoint URL, username, password, prefix for the order id and return URL.
Create a shurjopay_config.js in the project directory with text similar like below:

```javaScript
const shurjopay_config = {
    SP_ENDPOINT: "https://sandbox.shurjopayment.com",
    SP_USERNAME: "sp_sandbox",
    SP_PASSWORD: "pyyk97hu&6u6",
    SP_PREFIX: "sp",
    SP_RETURN_URL: "https://<your.app.com>/shurjopay-response",
};

export { shurjopay_config };
```

#### Payment verification can be done after each transaction with shurjopay order id

```javascript
const verifyPayment_details = await verifyPayment(sp_order_id);
```

**NOTE**: Please checkout this readme docs for [react](README_react.md) or [vue.js](README_vuejs.md) projects.

## References

1. [React sample project](https://github.com/shurjopay-plugins/sp-plugin-usage-examples/tree/dev/react-app-js-plugin) showing usage of the javascript plugin.
2. Vanilla [javascript sample project](https://github.com/shurjopay-plugins/sp-plugin-usage-examples/tree/dev/javascript-app-javascript-plugin) to get your feet wet with shurjopay.
3. [Sample applications and projects](https://github.com/shurjopay-plugins/sp-plugin-usage-examples) in many different languages and frameworks showing shurjopay integration.
4. [shurjoPay Postman site](https://documenter.getpostman.com/view/6335853/U16dS8ig) illustrating the request and response flow using the sandbox system.
5. [shurjopay Plugins](https://github.com/shurjopay-plugins) home page on github

## License

This code is under the [MIT open source License](http://www.opensource.org/licenses/mit-license.php).

#### Please [contact](https://shurjopay.com.bd/#contacts) with shurjoPay team for more detail.

Copyright ©️2022 [ShurjoMukhi Limited](https://shurjomukhi.com.bd).
