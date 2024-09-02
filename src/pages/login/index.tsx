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

export const LoginPage = () => {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (props: LoginValues) => {
    console.log(props);
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
            <Button type="submit" className="flex gap-2 items-center">
              Увійти в Обліковий Запис <ArrowForward />
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};
