"use client";

import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { env } from "@/env";
import z from "zod";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { googleSignin } from "@/services/googleAuth";
import Link from "next/link";

const formData = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(8, "Please enter valid password."),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formData,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating user");
      const payload = {
        ...value,
        callbackURL: `${env.NEXT_PUBLIC_CALLBACK_URL}`,
        rememberMe: true,
      };
      toast.loading("Please wait...", { id: toastId });
      try {
        const { data, error } = await authClient.signIn.email(payload);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("User registration successfully...", { id: toastId });
      } catch (error) {
        console.error(error);
        toast.error("User registration failed.", { id: toastId });
      }
    },
  });
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="signin-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              {/*email */}
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              {/* password */}
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="password"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button form="signin-form" type="submit">
            Submit
          </Button>
        </CardFooter>
        <CardFooter className="flex flex-col">
          <Button
            onClick={() => {
              googleSignin;
            }}
            variant="outline"
            type="button"
          >
            Login with Google
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account? <Link href="/signup">Sign up</Link>
          </FieldDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
