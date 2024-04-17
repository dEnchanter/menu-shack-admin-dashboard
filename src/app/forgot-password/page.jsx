'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import { zodResolver } from '@hookform/resolvers/zod'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useState } from "react"
import { useForm } from "react-hook-form"
import instance from "@/util/axios";
import { Endpoint } from "@/util/constants";

const formSchema = z.object({
  email: z.string().email({ message: "Enter email address." }),
})

export default function Home() {

  const router = useRouter();
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  // Function to handle form submission
  async function onSubmit(data) {

    try {

      setIsLoading(true);
      await doForgotSender(data);

    } catch(error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function doForgotSender(body) {
    try {
      const response = await instance.post(Endpoint.FORGOT_PASSWORD, body);
      const payload = response?.data;

      if (payload && payload.status == true) {

        toast({
          variant: "success",
          description: payload.message,
        })

        router.replace('/');
        
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
          <Link href="/" className="mt-6 mb-4">
            <Image
              src="/logo_on_light.png"
              alt="home_screen"
              className="mx-auto"
              height="150"
              width="150" 
              quality="100"
            />
          </Link>
          <div className="mx-auto text-center">
            <h1 className="text-4xl font-bold text-[#0f2e33]">Forgot Password!</h1>
            <p className="mt-2 text-sm text-gray-600 font-semibold">
              Enter email to retrieve reset link
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
                </div>
                <Button 
                  className="w-full bg-[#0f2e33] hover:bg-[#Of2e33]/90 text-white"
                  isLoading={isLoading}
                >
                  Submit
                </Button>
              </form>
            </Form>
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
