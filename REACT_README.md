#### Step 3: Setup configuration parameters for shurjopay plugin correctly in your application.

<br>
e.g. API endpoint URL, username, password, prefix for the order id and return URL.<br>
Create a shurjopay_config.js in the project directory with text similar like below:

```javaScript
const shurjopay_config = {
  SP_ENDPOINT: process.env.REACT_APP_SP_ENDPOINT,
  SP_USERNAME:  process.env.REACT_APP_SP_USERNAME,
  SP_PASSWORD:  process.env.REACT_APP_SP_PASSWORD,
  SP_PREFIX:  process.env.REACT_APP_SP_PREFIX,
  SP_RETURN_URL:  process.env.REACT_APP_SP_RETURN_URL,
};

export { shurjopay_config };
```

Create a .env the react project directory with text similar like below:

```javaScript
REACT_APP_SP_ENDPOINT=https://sandbox.shurjopayment.com
REACT_APP_SP_USERNAME=sp_sandbox
REACT_APP_SP_PASSWORD=pyyk97hu&6u6
REACT_APP_SP_PREFIX=sp
REACT_APP_SP_RETURN_URL=https://<your.app.com>/shurjopay-response
```
