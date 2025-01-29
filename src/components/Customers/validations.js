import * as yup from "yup";

const validations = yup.object({

    firstname: yup.string().required("Bu alan zorunludur."),
    lastname: yup.string().required("Bu alan zorunludur."),
    phone: yup.string().required("Bu alan zorunludur."),
    email: yup.string().required("Bu alan zorunludur.").email("Lütfen geçerli bir e-posta adresi giriniz."),
});

export default validations;