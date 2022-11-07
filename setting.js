let client_ip = "";
fetch("https://checkip.amazonaws.com/")
  .then((res) => res.text())
  .then((ip) => {
    client_ip = ip;
  });
const setting = {
  url: "",
  username: "",
  password: "",
  prefix: "",
  return_url: "",
  cancel_url: "",
  order_id: "",
  client_ip: client_ip,
};

export { setting };

