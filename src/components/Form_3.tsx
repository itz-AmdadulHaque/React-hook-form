import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

// form type
type formValue = {
  name: string;
  age: number;
  birth: string;
  phone: { number: string }[];
};

const Form_3 = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
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
    console.log("Form-3:\n", data);
  };

  return (
    <section>
      <h1>Form-3</h1>
      <p>Using useFieldArray to add dynamic array input of numbers.</p>
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
              minLength: {
                value: 3, 
                message: "Name must be at least 3 character long"
              }
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

        <button disabled={!isDirty || !isValid}  type="submit">
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </section>
  );
};

export default Form_3;
