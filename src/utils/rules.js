import { extend } from "vee-validate";

import { required, email } from "vee-validate/dist/rules";

extend("email", {
  ...email,
  message: "This doesn't look like a valid email address"
});

extend("required", { ...required, message: "This field can't be left blank." });
