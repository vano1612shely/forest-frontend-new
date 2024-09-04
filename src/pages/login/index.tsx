import "./style.scss";
import { Card } from "@/components/ui/card.tsx";
import Logo from "@/assets/logoGreen.png";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { loginSchema, LoginValues } from "@/pages/login/schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ArrowForward } from "@mui/icons-material";
import { useAuthStore } from "@/store/auth.store.ts";
import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@/api/api.ts";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useNavigate } from "@tanstack/react-router";

export const LoginPage = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.login);
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    mutate: login,
    data,
    error,
    isPending,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginValues) =>
      httpClient.login({
        url: "/api/v1/login",
        payload: { login: data.email, password: data.password },
      }),
  });
  useEffect(() => {
    if (data) {
      toast.success("Вхід виконано успішно");
      setUser(data.result.token, data.result.user);
      navigate({ to: "/" });
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      const e = error as AxiosError;
      // @ts-ignore
      console.log(e?.response?.data?.message || error.message);
      // @ts-ignore
      toast.error(e?.response?.data?.message || error.message);
    }
  }, [error]);
  const onSubmit = (props: LoginValues) => {
    login(props);
  };
  return (
    <div className="login_bg">
      <Card className="login__card">
        <img src={Logo} alt="" className="w-[148px] h-[50px]" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-[32px]"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пошта</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="flex gap-2 items-center"
              disabled={isPending}
            >
              Увійти в Обліковий Запис{" "}
              {isPending ? <LoaderCircle /> : <ArrowForward />}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};
