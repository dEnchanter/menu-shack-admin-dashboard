'use client'

import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import Image from "next/image";
import { zodResolver } from '@hookform/resolvers/zod'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import instance from "@/util/axios";
import { Endpoint } from "@/util/constants";
import { AppleIcon, ChromeIcon, FacebookIcon } from "@/components/Icons";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  })
})

export default function Home() {

  const router = useRouter();
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Function to handle form submission
  async function onSubmit(data) {

    try {

      setIsLoading(true);
      await doLoginSender(data);

    } catch(error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function doLoginSender(body) {
    try {
      const response = await instance.post(Endpoint.LOGIN, body);
      const payload = response?.data;

      if (payload && payload.status == true) {
        localStorage.setItem("user_id", payload.data.id);
        localStorage.setItem("token", payload.data.api_token);
        localStorage.setItem("name", payload.data.name);

        toast({
          variant: "success",
          description: payload.message,
        })

        router.replace('/dashboard');
        
      } else {
        toast({
          variant: "destructive",
          description: payload.message,
        })
      }
    } catch(error) {
      console.error("Something went wrong")
    }
  }

  return (
    <div className="min-h-screen grainy flex">
      <div className="flex w-1/2 flex-col justify-center px-8">
        <div className="">
          <div className="mt-6 mb-4">
            <Image
              src="/logo_on_light.png"
              alt="home_screen"
              className="mx-auto"
              height="150"
              width="150" 
              quality="100"
            />
          </div>
          <div className="mx-auto text-center">
            <h1 className="text-4xl font-bold text-[#0f2e33]">Welcome back!</h1>
            <p className="mt-2 text-sm text-gray-600 font-semibold">
              Login to access your Dashboard
            </p>
          </div>
          <div className="mt-4 max-w-lg mx-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col space-y-4 mb-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xs font-semibold" htmlFor="email">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            placeholder="xyz@mail.com" 
                            type="email"
                            {...field}
                            className="shadow"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState: { error } }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold text-xs">Password</FormLabel>
                          <div className="relative"> {/* Wrapper div */}
                            <FormControl>
                              <Input
                                id="password"
                                placeholder="Input Password" 
                                type={showPassword ? 'text' : 'password'}
                                {...field}
                                className="pr-10 shadow" // Add right padding to make space for the icon
                              />
                            </FormControl>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                              {showPassword ? (
                                <EyeOffIcon className="h-5 w-5 text-gray-400" onClick={togglePasswordVisibility} />
                              ) : (
                                <EyeIcon className="h-5 w-5 text-gray-400" onClick={togglePasswordVisibility} />
                              )}
                            </div>
                          </div>
                          {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
                      </FormItem>
                    )}
                  />
                  <Link className="text-xs text-[#000] hover:underline self-end" href="/forgot-password">
                    Forgot Password
                  </Link>
                </div>
                <Button 
                  className="w-full bg-[#0f2e33] hover:bg-[#Of2e33]/90 text-white"
                  isLoading={isLoading}
                >
                  Login
                </Button>
              </form>
            </Form>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <span className="bg-gray-300 h-px flex-grow t-2 relative top-2" />
            <span className="flex-none uppercase px-2 text-xs text-gray-400 font-semibold">or continue with</span>
            <span className="bg-gray-300 h-px flex-grow t-2 relative top-2" />
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <ChromeIcon className="text-gray-600" />
            <AppleIcon className="text-gray-600" />
            <FacebookIcon className="text-gray-600" />
          </div>
          <div className="mt-6 text-center">
            <p className="text-xs">
              Not a member?&nbsp;
              <a className="text-[#0f2e33] underline" href="#">
                Register now
              </a>
            </p>
          </div>
        </div>
 
      </div>
      <div className="flex w-1/2 items-center justify-center bg-[#F5F5F5] p-8 shadow-2xl">
        <div>
          <div className="mt-8">
            <Image
              src="/logo_on_light.png"
              alt="home_screen"
              className="mx-auto"
              height="300"
              width="300" 
              quality="100"
            />
          </div>
          <p className="text-center text-lg mt-8 font-semibold italic text-black/40">Uber eats of Liberia</p>
        </div>
      </div>
    </div>
  );
}