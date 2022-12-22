![alt text](https://shurjopay.com.bd/dev/images/shurjoPay.png)

# shurjoPay javaScript package (plugin)

[![Test Status](https://github.com/rust-random/rand/workflows/Tests/badge.svg?event=push)]()
![NPM](https://img.shields.io/npm/l/sp-plugin)

Official shurjoPay JavaScript package (plugin) for merchants or service providers to connect with shurjoPay Payment Gateway v2.1 developed and maintained by shurjoMukhi Limited.

This plugin package can be used with any frontend application or framework (e.g. vanillaJs, reactJs, vueJS etc.).

This plugin package makes it easy for you to integrate with shurjoPay v2.1 with just three method calls:

- makePayment()
- verifyPayment()
- paymentStatus()

## Audience

This document is intended for the developers and technical personnel of merchants and service providers who want to integrate the shurjoPay online payment gateway using python.

# Usage

Use `npm` to install this plugin inside your project environment

```
npm install sp-plugin-javascript
```

Or `clone` the repository and install the package

```
git clone https://github.com/shurjopay-plugins/sp-plugin-js.git
```

## Initialize the plugin with shurjoPay configuration

Create a .env.local and setting.js file inside your projects root directory. Here is a sample .env.local & setting.js configuration

For React Application<br/>
.env.local

```javaScript
REACT_APP_URL=https://sandbox.shurjopayment.com
REACT_APP_USER_NAME=sp_sandbox
REACT_APP_PASSWORD=pyyk97hu&6u6
REACT_APP_PREFIX=sp
REACT_APP_RETURN_URL=https://sandbox.shurjopayment.com/response
```

setting.js

```javaScript
const setting = {
  url: process.env.REACT_APP_URL,
  username: process.env.REACT_APP_USER_NAME,
  password:process.env.REACT_APP_PASSWORD,
  prefix: process.env.REACT_APP_PREFIX,
  return_url:process.env.REACT_APP_RETURN_URL,
  cancel_url: process.env.REACT_APP_RETURN_URL,
};


export { setting };
```

For Vue Application<br/>
.env.local

```javaScript
VUE_APP_URL=https://sandbox.shurjopayment.com
VUE_APP_USER_NAME=sp_sandbox
VUE_APP_PASSWORD=pyyk97hu&6u6
VUE_APP_PREFIX=sp
VUE_APP_RETURN_URL=https://sandbox.shurjopayment.com/response
```

setting.js

```javaScript
const setting = {
  url: process.env.VUE_APP_URL,
  username: process.env.VUE_APP_USER_NAME,
  password:process.env.VUE_APP_PASSWORD,
  prefix: process.env.VUE_APP_PREFIX,
  return_url:process.env.VUE_APP_RETURN_URL,
  cancel_url: process.env.VUE_APP_RETURN_URL,
};


export { setting };
```

After that, you can start using our package the way you want based on your application. Here we are providing a basic example code snip for you.

Example

```javaScript
import {  makePayment, paymentStatus, verifyPayment } from "sp-plugin-javascript";
```

```javaScript
 const makePayment_details= await makePayment(order_id, inputs); //handle promise
 const { checkout_url } = makePayment_details;
```

That's all! Now you are ready to use our shurjoPay javaScript package to make your payment system easy and smooth.

## Checkout our [React Example](https://github.com/shurjopay-plugins/sp-plugin-usage-examples/tree/dev/react-app-js-plugin) application

### [shurjopay Plugins](https://github.com/shurjopay-plugins)

## License

This code is under the [MIT open source License](http://www.opensource.org/licenses/mit-license.php).

#### Please [contact](https://shurjopay.com.bd/#contacts) with shurjoPay team for more detail!

<hr>
Copyright ©️2022 Shurjomukhi Limited.
