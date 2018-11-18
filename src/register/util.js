export function vlaidateField(name, value) {
  const field = {
    validateStatus: "success",
    help: ""
  };
  if (name === "fullname") {
    const regex = /^[a-z][a-z ]{2,18}[a-z]$/;
    if (!regex.test(value)) {
      field.validateStatus = "error";
      field.help =
        "Minimum 4 and Maximum 20 char (small-alphabet, space-in-between)";
    }
    return field;
  } else if (name === "username") {
    const regex = /^[a-z][a-z,0-9]{3,19}$/;
    if (!regex.test(value)) {
      field.validateStatus = "error";
      field.help =
        "Minimum 4 and Maximum 20 char (small-alpha-numeric, start with alphabet)";
    }
    return field;
  } else if (name === "password") {
    const regex = /^.{4,8}$/;
    if (!regex.test(value)) {
      field.validateStatus = "error";
      field.help = "Minimum 4 and Maximum 8 char";
    }
    return field;
  }
}

export function vlaidateFields(fieldsData) {
  const newFieldsData = {};
  newFieldsData.fullname = {
    value: fieldsData.fullname.value,
    ...vlaidateField("fullname", fieldsData.fullname.value)
  };
  newFieldsData.username = {
    value: fieldsData.username.value,
    ...vlaidateField("username", fieldsData.username.value)
  };
  newFieldsData.password = {
    value: fieldsData.password.value,
    ...vlaidateField("password", fieldsData.password.value)
  };
  return newFieldsData;
}
