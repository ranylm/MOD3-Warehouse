import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "../../utilities/agent-service";

type LoginInput = {
  email: string;
  password: string;
};
export default function LoginForm({ setUser }) {
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    setError(false);
    const user = await User.login(data).send();
    // redirect on success
    user ? setUser(user) : setError(true);
    localStorage.setItem("token", user);
  };

  return (
    <div>
      <h1>RegisterForm</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        Email
        <input {...register("email", { required: true })} type="email" />
        Password
        <input
          type="password"
          {...register("password", { required: true, minLength: 3 })}
        />
        {error === true ? (
          <p style={{ color: "red" }}>Invalid Username /Password</p>
        ) : null}
        <button
          type="submit"
          disabled={Object.keys(errors).length ? true : false}
        >
          Login
        </button>
      </form>
    </div>
  );
}