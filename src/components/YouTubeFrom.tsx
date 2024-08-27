import { useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import { useState } from "react";

// form type
type formValue = {
  username: string;
  email: string;
  channel: string;
  social: {
    facebook: string;
    tweeter: string;
  };
  phoneNumbers: string[];
};

let count = 0; // for chekcing component rerender
const YouTubeFrom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formValue>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        facebook: "",
        tweeter: "",
      },
      phoneNumbers: ["", ""], // fixed two size array, not dynamic
    },
  });

  const [custom, setCustom] = useState("");
  count++; // for checking rerender

  const onSubmit = (data: formValue) => {
    console.log(data);
  };
  return (
    <section>
      <h1>YouTube-Form-1 renderCount({count})</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "User name is required",
              },
            })}
          />
          {/* register object constructor gives us a obj = {name: "username", ref, onChange, onBlur} */}
          <p className="error">{errors.username?.message}</p>
        </div>

        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "invalid email pattern",
              },
              validate: (fieldValue) => {
                if (fieldValue === "admin@gmail.com")
                  return "Enter a different email";
              }, //custom validation, you enter any email except admin
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div>
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "User name is required",
              },
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        {/* nested object value */}
        <div>
          <label htmlFor="facebook">Facebook</label>
          <input
            type="text"
            id="facebook"
            {...register("social.facebook", {
              required: {
                value: true,
                message: "Facebook field is required",
              },
            })}
          />
          <p className="error">{errors.social?.facebook?.message}</p>
        </div>

        <div>
          <label htmlFor="tweeter">Tweeter</label>
          <input
            type="text"
            id="tweeter"
            {...register("social.tweeter", {
              required: {
                value: true,
                message: "Tweeter field is required",
              },
            })}
          />
          <p className="error">{errors.social?.tweeter?.message}</p>
        </div>
        
        {/* array value */}
        <div>
          <label htmlFor="phonNumber1">Phon Number 1</label>
          <input
            type="text"
            id="phonNumber1"
            {...register("phoneNumbers.0", {
              required: {
                value: true,
                message: "PhonNumber 1 field is required",
              },
            })}
          />
          {<p className="error">{errors.phoneNumbers?.[0]?.message}</p>}
        </div>

        <div>
          <label htmlFor="phonNumber1">Phon Number 2</label>
          <input
            type="text"
            id="phonNumber2"
            {...register("phoneNumbers.1", {
              required: {
                value: true,
                message: "PhonNumber 2 field is required",
              },
            })}
          />
          {<p className="error">{errors.phoneNumbers?.[1]?.message}</p>}
        </div>
        
        <button>Submit</button>
      </form>
      {/* <DevTool control={control} /> */}

{/* custom form with controlled input */}
      <form action="">
        <p>
          {`Custom form cause component rerender(${count/2}) when inputing`}
        </p>
        <input
          id="custom"
          type="text"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
        />
      </form>
    </section>
  );
};

export default YouTubeFrom;
