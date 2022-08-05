import * as Yup from "yup";

export const addTaskSchema = Yup.object().shape({
  title: Yup.string()
    .required("This field is required!")
    .min(3, "Title should be at least 3 characters long")
    .max(50, "Title should be at most 50 characters long"),
  description: Yup.string()
    .required("Description is required!")
    .min(3, "Description should be at least 3 characters long")
    .max(300, "Description should be at most 300 characters long"),
  dueDate: Yup.date().required("Date is required!"),
  collections: Yup.array(Yup.string()).default([]),
  priority: Yup.number().default(2),
});
