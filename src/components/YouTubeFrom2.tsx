import { useFieldArray, useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";

// form type
type formValue = {
  name: string;
  age: number;
  birth: string;
  phone: { number: string }[];
};

const YouTubeFrom2 = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<formValue>({
    defaultValues: {
      name: "",
      age: 0,
      birth: new Date().toISOString().substring(0, 10),
      phone: [],
    },
  });

  const { fields, append, remove } = useFieldArray({ name: "phone", control });

  const onSubmit = (data: formValue) => {
    console.log("Form-2:\n", data);
  };

  return (
    <section>
      <h1>Form-2</h1>
      <p>
        Use useFieldArray to add dynamic array elements from input. Click the
        "Add number" button to add values and see the output in the terminal.
        Note that age is a number, and date is a Date type. It's generally
        recommended to send date values as strings (e.g., ISO 8601 format) to
        the backend.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
            })}
          />
          {/* register object constructor gives us a obj = {name: "username", ref, onChange, onBlur} */}
          <p className="error">{errors.name?.message}</p>
        </div>

        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "age is required",
              },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="birth">Date of Birth</label>
          <input
            type="date"
            id="birth"
            {...register("birth", {
              valueAsDate: true,
              required: {
                value: true,
                message: "Birth of date is required",
              },
            })}
          />
          <p className="error">{errors.birth?.message}</p>
        </div>

        {/* dynamic array value */}
        <div className="form-control">
          <button type="button" onClick={() => append({ number: "" })}>
            Click to add numbers
          </button>
          {fields.map((field, index) => (
            <div key={field.id}>
              <label htmlFor={field.id}>Phon Number-{index + 1}</label>
              <input
                type="text"
                id={field.id}
                {...register(`phone.${index}.number` as const, {
                  required: {
                    value: true,
                    message: "Phone number is required",
                  },
                })}
              />
              <p className="error">{errors.phone?.[index]?.number?.message}</p>
              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <button type="submit">Submit</button>
      </form>
      {/* <DevTool control={control} /> */}
    </section>
  );
};

export default YouTubeFrom2;
