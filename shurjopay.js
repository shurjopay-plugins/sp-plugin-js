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


import { shurjopay_config } from '../../shurjopay_config.js';

//Getting credentials from shurjopay_config.js file
const sp_endpoint = shurjopay_config.SP_ENDPOINT;
const sp_username= shurjopay_config.SP_USERNAME;
const sp_password = shurjopay_config.SP_PASSWORD;
const sp_prefix = shurjopay_config.SP_PREFIX;
const sp_return_url = shurjopay_config.SP_RETURN_URL;


/**
 * Return authentication token for shurjoPay payment gateway system.
 * Setup shurjopay.properties file.
 *
 * @return authentication details with valid token
 * @throws ShurjopayException while merchant username and password is invalid.
 */
async function authentication() {
  try {
      // Fetch payment URL from authenticate API
    const response = await fetch(`${sp_endpoint}/api/get_token`, {
      method: "POST",
       // Request Header credentials
      headers: {
        "Content-Type": "application/json",
      },
       // Request body credentials
      body: JSON.stringify({
        username: sp_username,
        password: sp_password,
      }),
    });

    if (response.ok) {
      const tokenDetails = await response.json();
      return tokenDetails;
    } else {
      throw new Error("Check User Name or Password");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
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
async function makePayment(order_id, form_data) {
  try {
    // Getting IP from user device
    const ipResponse = await fetch("https://checkip.amazonaws.com/");
    const client_ip = await ipResponse.text();

    // Call authentication function to get token details with store ID
    const token_details = await authentication();

    const { token, token_type, store_id } = token_details;
    const payLoad={
      // Request body credentials
      prefix: sp_prefix,
      store_id: store_id,
      token: token,
      return_url: sp_return_url,
      cancel_url: sp_return_url,
      order_id: order_id,
      client_ip: client_ip,
      ...form_data
    }

    // Validate amount
    if (form_data.amount <= 0) {
      throw new Error("Amount cannot be less then or equal to 0");
    }

    // Fetch payment URL from makePayment API
    const response = await fetch(`${sp_endpoint}/api/secret-pay`, {
      method: "POST",
      headers: {
        // Request header credentials
        authorization: `${token_type} ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payLoad),
    });

    if (response.ok) {
      const makePaymentDetails = await response.json();
      return makePaymentDetails;
    } else {
      throw new Error("Failed to Payment");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
/**
 * This method is used for verifying order by order id which could be get by payment response object
 *
 * @param orderId
 * @return order object if order verified successfully
 * @throws ShurjopayException while merchant user name and password is invalid.
 * @throws ShurjopayVerificationException while token_type, token, order id is invalid or payment is not initiated properly or {#link HttpClient} exception
 */
async function verifyPayment(sp_order_id) {
  try {
    if (!sp_order_id) {
      return "Order Id Invalid";
    }

    const token_details = await authentication();
    const { token, token_type } = token_details;

    const response = await fetch(`${sp_endpoint}/api/verification`, {
      method: "POST",
      headers: {
        // Request header credentials
        authorization: `${token_type} ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Request body credentials
        order_id: sp_order_id,
      }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Payment Verification Fail");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

/**
 * This method is used for verifying order by order id which could be get by payment response object
 *
 * @param  orderId
 * @return order object if order verified successfully
 * @throws ShurjopayException while merchant user name and password is invalid.
 * @throws ShurjopayVerificationException while order id is invalid or payment is not initiated properly or {#link HttpClient} exception
 */
async function paymentStatus(sp_order_id) {
  try {
    if (!sp_order_id) {
      return "Payment Id Invalid";
    }

    const token_details = await authentication();
    const { token, token_type } = token_details;

    const response = await fetch(`${sp_endpoint}/api/verification`, {
      method: "POST",
      headers: {
        // Request header credentials
        authorization: `${token_type} ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Request body credentials
        order_id: sp_order_id,
      }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Payment Verification Fail");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

/*
 * Export functions and return values
 */
export {  makePayment, paymentStatus, verifyPayment };

