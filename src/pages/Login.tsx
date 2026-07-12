import login_image from "../../public/assets/images/login_image.png";
import logo from "../../public/assets/images/Logo.png";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email kiritilishi shart")
    .email("Email noto'g'ri")
    .regex(
      /^[A-Za-z0-9._%+-]+@gmail\.com$/,
      "Faqat Gmail email manzillar qabul qilinadi (@gmail.com)"
    ),
  password: z
    .string()
    .min(8, "Parol kamida 8 ta belgidan iborat bo'lishi kerak")
    .max(20, "Parol 20 tadan oshmasligi kerak"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginForm) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiJ9.signature";

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify({ email: data.email }));

    toast.success("Muvaffaqiyatli tizimga kirildi!");
    navigate("/dashboard");
  };

  return (
    <div className="flex h-screen bg-[#19223F] p-2">
      {/* Left Image */}
      <div className="hidden lg:block w-1/2">
        <img
          src={login_image}
          alt="login"
          className="h-full w-full rounded-l-3xl object-cover"
        />
      </div>

      {/* Right Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-[#F5F5F6] rounded-r-3xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[430px] px-6"
        >
          <img src={logo} alt="logo" className="mx-auto mb-12 w-[180px]" />

          <div className="space-y-6">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                className={`mt-2 h-12 ${
                  errors.email ? "border-red-500 focus:border-red-500" : ""
                }`}
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-sm">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className={`mt-2 h-12 ${
                  errors.password ? "border-red-500 focus:border-red-500" : ""
                }`}
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 h-12 w-full bg-[#FF9A3C] hover:bg-[#ff8d1a] text-base font-semibold"
          >
            {isSubmitting ? "Kirilmoqda..." : "Kirish"}
          </Button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
              Forgot password?
            </p>
            <p className="mt-4 text-xs text-[#8C8C9B]">
              Don't have an account?{" "}
              <span className="text-[#FF9A3C] cursor-pointer hover:underline">
                Create one now
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
