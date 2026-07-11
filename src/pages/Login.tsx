import login_image from "../../public/assets/images/login_image.png";
import logo from "../../public/assets/images/Logo.png";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { toast } from "sonner";


import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginForm) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiJ9.signature";

    localStorage.setItem("token", token);

    localStorage.setItem(
      "user",
      JSON.stringify({
        email: data.email,
      })
    );

    toast.success("Muvaffaqiyatli tizimga kirildi!");

    navigate("/dashboard");
  };

  return (
    <div className="flex h-screen bg-[#19223F] p-2">
      <div className="w-1/2">
        <img
          src={login_image}
          alt="login"
          className="h-full w-full rounded-l-2xl object-cover"
        />
      </div>

      <div className="flex w-1/2 items-center justify-center rounded-r-2xl bg-[#F5F5F6]">
        <form onSubmit={handleSubmit(onSubmit)} className="w-[430px]">
          <img src={logo} alt="logo" className="mx-auto mb-10 w-[180px]" />

          <div className="mb-5">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              className={`mt-2 h-12 ${errors.email ? "border-red-500" : ""}`}
              {...register("email", {
                required: "Email kiritilishi shart",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Email noto'g'ri",
                },
              })}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              className={`mt-2 h-12 ${errors.password ? "border-red-500" : ""}`}
              {...register("password", {
                required: "Parol kiritilishi shart",
                minLength: {
                  value: 8,
                  message: "Parol kamida 8 ta belgidan iborat bo'lishi kerak",
                },
                maxLength: {
                  value: 20,
                  message: "Parol 20 tadan oshmasligi kerak",
                },
              })}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full bg-[#FF9A3C] hover:bg-[#ff8d1a]"
          >
            {isSubmitting ? "Loading..." : "Login"}
          </Button>

          <p className="mt-5 text-center text-sm font-medium cursor-pointer">
            Forgot password?
          </p>

          <p className="mt-3 text-center text-xs text-[#8C8C9B]">
            Don't have an account?
            <span className="ml-1 cursor-pointer text-[#FF9A3C]">
              Create one now
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
