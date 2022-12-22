//if you implement in vanillaJS then you need to change this setting with proper credential because in vanillaJs environment file isn't work.
const setting = {
  url: process.env.REACT_APP_URL,
  username: process.env.REACT_APP_USER_NAME,
  password:process.env.REACT_APP_PASSWORD,
  prefix: process.env.REACT_APP_PREFIX,
  return_url:process.env.REACT_APP_RETURN_URL,
};

export { setting };

