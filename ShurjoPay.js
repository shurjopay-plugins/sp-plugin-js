/*
/**
 * 
 * Plug-in service to provide shurjoPay gateway services.
 * 
 * @uthor: Saiful Islam Shanto
 * @since 2022-11-02
*
*
*/

// TODO distribute using npm , bower, grunt ,cdn ,yarn
// TODO Data model need to be defined
// TODO Add comments on class, method and important actions (Done)///
// TODO remove use of global variables in plugin code (Done)///
// TODO shurjopay config injection refacorting needed. Work with CTO
// TODO after this JS lib fully complete, write new code in TypeScript. with CTO

import { setting } from "./setting.js";

//Getting credentials from setting.js file
const url = setting.url;
const username = setting.username;
const password = setting.password;
const prefix = setting.prefix;
const return_url = setting.return_url;
const cancel_url = setting.cancel_url;

/**
 * Return authentication token for shurjoPay payment gateway system.
 * Setup shurjopay.properties file.
 *
 * @return authentication details with valid token
 * @throws ShurjopayException while merchant username and password is invalid.
 */
async function authentication() {
  let token_details = " ";
  if (username && password) {
    await fetch(`${url}/api/get_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((tokenDetails) => {
        token_details = tokenDetails;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    return token_details;
  } else {
    return "User Name Not Found";
  }
}

/**
 * This method is used for making payment.
 *
 * @param Payment request object. See the shurjoPay version-2 integration documentation(beta).docx for details.
 * @return Payment response object contains redirect URL to reach payment page,token_details,order_id, form_data to verify order in shurjoPay.
 * @throws ShurjopayException while merchant username and password is invalid.
 * @throws ShurjopayPaymentException while {#link PaymentReq} is not prepared properly or {#link HttpClient} exception
 */
async function makePayment(token_details, order_id, form_data) {
  //Getting Ip from User device
  const ip = await fetch("https://checkip.amazonaws.com/");
  const client_ip = await ip.text();
  const phone_regx = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
  const email_regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const { token, token_type, store_id } = token_details;
  let makePayment_details = " ";
  if (form_data) {
    if (
      token_type &&
      token &&
      store_id &&
      form_data.amount > 9 &&
      form_data.currency &&
      form_data.customer_phone.match(phone_regx) &&
      form_data.customer_name.length > 1 &&
      form_data.customer_city.length > 1 &&
      form_data.customer_address.length > 1 &&
      form_data.customer_post_code.length === 4 &&
      form_data.customer_email.match(email_regx) &&
      order_id
    ) {
      await fetch(`${url}/api/secret-pay`, {
        method: "POST",
        headers: {
          authorization: `${token_type} ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prefix: prefix,
          store_id: token_details.store_id,
          token: token_details.token,
          return_url: return_url,
          cancel_url: cancel_url,
          amount: form_data.amount,
          order_id: order_id,
          currency: form_data.currency,
          customer_name: form_data.customer_name,
          customer_address: form_data.customer_address,
          customer_phone: form_data.customer_phone,
          customer_city: form_data.customer_city,
          customer_email: form_data.customer_email,
          customer_post_code: form_data.customer_post_code,
          client_ip: client_ip,
        }),
      })
        .then((response) => response.json())
        .then((makePaymentdetails) => {
          makePayment_details = makePaymentdetails;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      return makePayment_details;
    } else {
      return "Input(makePayment) Value is not valid";
    }
  } else {
    return "User Information Missing";
  }
}
/**
 * This method is used for verifying order by order id which could be get by payment response object
 *
 * @param token_details,orderId
 * @return order object if order verified successfully
 * @throws ShurjopayException while merchant user name and password is invalid.
 * @throws ShurjopayVerificationException while token_type, token, order id is invalid or payment is not initiated properly or {#link HttpClient} exception
 */
async function verifyPayment(token_details, sp_order_id) {
  const { token, token_type } = token_details;
  let verify_status = " ";
  if (token && token_type && sp_order_id) {
    await fetch(`${url}/api/verification`, {
      method: "POST",
      headers: {
        authorization: `${token_type} ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: sp_order_id,
      }),
    })
      .then((response) => response.json())
      .then((paymentDetails) => {
        log(paymentDetails);
        verify_status = paymentDetails;
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    return verify_status;
  } else {
    return "Require Data Not Found";
  }
}

/**
 * This method is used for verifying order by order id which could be get by payment response object
 *
 * @param token_details, orderId
 * @return order object if order verified successfully
 * @throws ShurjopayException while merchant user name and password is invalid.
 * @throws ShurjopayVerificationException while order id is invalid or payment is not initiated properly or {#link HttpClient} exception
 */
async function paymentStatus(token_details, sp_order_id) {
  const { token, token_type } = token_details;
  let payment_status = " ";
  if (token && token_type && sp_order_id) {
    await fetch(`${url}/api/payment-status`, {
      method: "POST",
      headers: {
        authorization: `${token_type} ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: sp_order_id,
      }),
    })
      .then((response) => response.json())
      .then((paymentDetails) => {
        payment_status = paymentDetails;
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    return payment_status;
  } else {
    return "Require Data Not Found";
  }
}

async function log(...msgs) {
  let dirHandle = await window.showDirectoryPicker();
  const file = await dirHandle.getFileHandle("../log.txt", {
    create: true,
  });

  const blob = new Blob(msgs);
  const writableStream = await file.createWritable();
  // write our file
  console.log(blob);
  await writableStream.write(blob);
  // close the file and write the contents to disk.
  await writableStream.close();
}
/*
 * Export functions and return values
 */
export { authentication, makePayment, paymentStatus, verifyPayment };

