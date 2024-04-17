"use client"

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import Image from "next/image"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { ChromeIcon, CreditCardIcon, DribbbleIcon, FacebookIcon, LockIcon, MoreHorizontalIcon, PinIcon, ShareIcon, TwitterIcon, UserIcon } from "@/components/Icons"

export default function Page() {

  const [activeButton, setActiveButton] = useState('accountSettings');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="flex space-x-4">
      <div className="flex flex-col space-y-7">
        <Card className="w-[350px]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage alt="George Smith" src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>GS</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>George Smith</CardTitle>
                  <CardDescription>General Manager</CardDescription>
                </div>
              </div>
              <MoreHorizontalIcon className="text-gray-400" />
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="my-2">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <Button 
                  className={`flex items-center justify-start space-x-2 px-2 py-3 ${activeButton === 'accountSettings' ? 'bg-indigo-600/80 hover:bg-indigo-600/90 text-white' : 'bg-white text-black hover:bg-indigo-600/50'}`}
                  onClick={() => handleButtonClick('accountSettings')}
                >
                  <ShareIcon className="text-gray-400" />
                  <span>Account Settings</span>
                </Button>
                <Button 
                  className={`flex bg-white text-black items-center justify-start space-x-2 px-2 py-3 ${activeButton === 'personalInformation' ? 'bg-indigo-600/80 hover:bg-indigo-600/90 text-white' : 'bg-white text-black hover:bg-indigo-600/50'}`}
                  onClick={() => handleButtonClick('personalInformation')}
                >
                  <UserIcon className="text-gray-400" />
                  <span>Personal Information</span>
                </Button>
                <Button 
                  className={`flex bg-white text-black items-center justify-start space-x-2 px-2 py-3 ${activeButton === 'changePassword' ? 'bg-indigo-600/80 hover:bg-indigo-600/90 text-white' : 'bg-white text-black hover:bg-indigo-600/50'}`}
                  onClick={() => handleButtonClick('changePassword')}
                >
                  <LockIcon className="text-gray-400" />
                  <span>Change Password</span>
                </Button>
              </div>
              <Separator />
              <div className="flex flex-col space-y-2">
                <Button 
                  className={`flex bg-white text-black items-center justify-start space-x-2 px-2 py-3 ${activeButton === 'payments' ? 'bg-indigo-600/80 hover:bg-indigo-600/90 text-white' : 'bg-white text-black hover:bg-indigo-600/50'}`}
                  onClick={() => handleButtonClick('payments')}
                  disabled={true}
                >
                  <CreditCardIcon className="text-gray-400" />
                  <span>Saved Payment Methods</span>
                </Button>
                <Button 
                  className={`flex bg-white text-black items-center justify-start space-x-2 px-2 py-3 ${activeButton === 'socials' ? 'bg-indigo-600/80 hover:bg-indigo-600/90 text-white' : 'bg-white text-black hover:bg-indigo-600/50'}`}
                  onClick={() => handleButtonClick('socials')}
                >
                  <ShareIcon className="text-gray-400" />
                  <span>Social Networks</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* <Card
          className="w-[350px] bg-red-400 text-white borderborder-red-400">
          <CardHeader>
            <CardTitle>Important Information!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Lorem ipsum dolor sit amet conctetur non troppo di sarono ampreduoso meduso de la Application Package.
              For More information, please click button below and see video guide.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost">Dismiss</Button>
            <Button variant="default">Take Action</Button>
          </CardFooter>
        </Card> */}
      </div>
      
      {activeButton === 'accountSettings' && <AccountInfoCard />}
      {activeButton === 'personalInformation' && <PersonalInfoCard />}
      {activeButton === 'changePassword' && <PasswordInfoCard />}
      {activeButton === 'socials' && <SocialInfoCard />}

    </div>
  );
}

const AccountInfoCard = () => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-[.3rem]">
            <Label htmlFor="company-name">Company Name</Label>
            <Input id="company-name" placeholder="Lindo International LLC" />
          </div>
          <div className="flex flex-col space-y-[.3rem]">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="mail@yourmail.com" type="email" />
          </div>
          <div className="flex flex-col space-y-[.3rem]">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="+1 (366) 34-5678" />
          </div>
          <div className="flex flex-col space-y-[.3rem]">
            <Label htmlFor="country">Country</Label>
            <Input id="country" placeholder="United States" />
          </div>
          <div className="flex flex-col space-y-[.3rem]">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="Boston" />
          </div>
          <div className="flex flex-col space-y-[.3rem]">
            <Label htmlFor="state">State</Label>
            <Input id="state" placeholder="MA" />
          </div>
          <div className="flex flex-col space-y-[.3rem]">
            <Label htmlFor="zip">Postal Zip Code</Label>
            <Input id="zip" placeholder="02111" />
          </div>
          <div className="flex flex-col space-y-[.3rem]">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="70, Charter str. Apartment: 59a" />
          </div>
          <Button className="mt-4 bg-teal-500 text-white">SAVE</Button>
        </form>
      </CardContent>
    </Card>
  )
}

const PersonalInfoCard = () => {
  return (
    <div className="flex-1 bg-white p-6 rounded-md shadow max-h-[30rem]">
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-2">Add / Edit Personal Information</h1>
        <div className="flex items-center justify-around space-x-4">
          <div className="flex flex-col justify-center items-center">
            <label className="text-sm font-medium" htmlFor="upload-image">
              Upload Image
            </label>
            <div className="relative">
              <Image
                alt="Profile"
                className="rounded-full"
                height="150"
                src="/placeholder2.png"
                style={{
                  aspectRatio: "100/100",
                  objectFit: "cover",
                }}
                width="150" 
              />
            </div>
            <Button className="mt-2 bg-gray-400" variant="secondary">
              Change Photo
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col space-y-[.3rem]">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" placeholder="Name, Last name" />
            </div>
            
            <div className="flex flex-col space-y-[.3rem]">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="City" />
            </div>
            
            <div className="flex flex-col space-y-[.3rem]">
              <Label htmlFor="phone">Phone number</Label>
              <Input id="phone" placeholder="Mobile Phone Number" />
            </div>
            
            <div className="flex flex-col space-y-[.3rem]">
              <Label htmlFor="country">Country</Label>
              <Select>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select a country">Select a country</SelectValue>
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem disabled value="placeholder" style={{ display: 'none' }}>Select a country</SelectItem>
                  <SelectItem value="united-states">United States</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            

            <div className="flex flex-col space-y-[.3rem]">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Email" />
            </div>

            <div className="flex flex-col space-y-[.3rem]">
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="State" />
            </div>
            
            <div className="flex flex-col space-y-[.3rem]">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="Address" />
            </div>

            <div className="flex flex-col space-y-[.3rem]">
              <Label htmlFor="zip">Zip Code</Label>
              <Input id="zip" placeholder="Postal Zip Code" />
            </div>
          </div>
        </div>
      </div>
      <Button className="w-full bg-blue-600">SAVE</Button>
    </div>
  )
}

const PasswordInfoCard = () => {
  return (
    <div className="flex-1 bg-white p-6 rounded-md shadow max-h-[27rem]">
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-2">Change Password</h1>
        <div className="flex items-center justify-around space-x-4 my-8">
          <div className="grid grid-cols-1 gap-6 w-full">
            <div className="flex flex-col space-y-[.3rem]">
              <Label htmlFor="old_password">Old Password</Label>
              <Input id="old_password" placeholder="*****" />
            </div>
            
            <div className="flex flex-col space-y-[.3rem]">
              <Label htmlFor="new_password">New Password</Label>
              <Input id="new_password" placeholder="*****" />
            </div>
            
            <div className="flex flex-col space-y-[.3rem]">
              <Label htmlFor="confirm_password">Confirm Password</Label>
              <Input id="confirm_password" placeholder="*****" />
            </div>
            
          </div>
        </div>
      </div>
      <Button className="w-full bg-blue-600">SAVE</Button>
    </div>
  )
}

const SocialInfoCard = () => {
  return (
    <div className="flex-1 bg-white p-6 rounded-md shadow">
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-2">Add Social Network Links</h1>
        <div className="flex items-center justify-around space-x-4 my-8">
          <div className="grid grid-cols-1 gap-6 w-full">
            <div className="flex flex-col space-y-[.3rem]">
              <Label htmlFor="facebook">Facebook</Label>
              <div className="relative">
                <FacebookIcon className="absolute inset-y-0 left-0 my-auto flex items-center pl-2 text-gray-500" />
                <Input id="facebook" className="pl-10" />
              </div>
            </div>
            
            <div className="flex flex-col space-y-[.3rem]">
              <Label htmlFor="twitter">Twitter</Label>
              <div className="relative"> 
                <TwitterIcon className="absolute inset-y-0 left-0 my-auto flex items-center pl-2 text-gray-500" />
                <Input id="twitter" />
              </div>
            </div>
            
            <div className="flex flex-col space-y-[.3rem]">
              <Label htmlFor="pinterest">Pinterest</Label>
              <div className="relative">
                <PinIcon className="absolute inset-y-0 left-0 my-auto flex items-center pl-2 text-gray-500" />
                <Input id="pinterest" />
              </div>
            </div>

            <div className="flex flex-col space-y-[.3rem]">
              <Label htmlFor="google">Google</Label>
              <div className="relative">
                <ChromeIcon className="absolute inset-y-0 left-0 my-auto flex items-center pl-2 text-gray-500" />
                <Input id="google" />
              </div>
              
            </div>

            <div className="flex flex-col space-y-[.3rem]">
              <Label htmlFor="behance">Behance</Label>
              <div className="relative">
                <DribbbleIcon className="absolute inset-y-0 left-0 my-auto flex items-center pl-2 text-gray-500" />
                <Input id="behance" />
              </div>
            </div>

            <div className="flex flex-col space-y-[.3rem]">
              <Label htmlFor="behance">Dribble</Label>
              <div className="relative">
                <DribbbleIcon className="absolute inset-y-0 left-0 my-auto flex items-center pl-2 text-gray-500" />
                <Input id="dribble" />
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <Button className="w-full bg-blue-600">SAVE</Button>
    </div>
  )
}
