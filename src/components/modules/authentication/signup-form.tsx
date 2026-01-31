"use client";
import { Button } from "@/components/ui/button";
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
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";

import * as z from "zod";
import { env } from "@/env";
import { googleSignin } from "@/services/googleAuth";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(4, "This field is required"),
  password: z.string().min(8, "Minimum password length at least 8 or above."),
  email: z.string().email("Please enter a valid email."),
});

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
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
        const { data, error } = await authClient.signUp.email(payload);

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
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* name */}
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
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
        <Button form="login-form" type="submit">
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
          Don&apos;t have an account? <Link href="/login">Sign In</Link>
        </FieldDescription>
      </CardFooter>
    </Card>
  );
}
