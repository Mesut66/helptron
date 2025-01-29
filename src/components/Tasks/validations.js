import * as yup from "yup";

const validations = yup.object({

    summary: yup.string().required("Bu alan zorunludur."),
    desc: yup.string().required("Bu alan zorunludur."),
    customerid: yup.string().required("Bu alan zorunludur."),
});

export default validations;

