"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

import {
  Plus,
  Link2,
} from "lucide-react"

const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters.")
    .max(30, "Title must be less than 50 characters."),

  description: z
    .string()
    .max(200, "Description must be less than 120 characters.")
    .optional(),

  link: z.string().url("Please enter a valid URL."),
})

export function VideoForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      title: "",
      description: "",
      link: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.success("Video Added Successfully", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-xl bg-[#111827] p-4 text-white">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className="relative min-h-screen overflow-hidden p-1 md:p-8 text-white">

          {/* Form Card */}
          <Card className=" rounded-md md:rounded-[28px] border border-[#1F2937] bg-[rgba(11,16,35,0.72)] shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-lg">

            <CardHeader className="flex justify-center">
              <CardTitle className="font-['Poppins'] text-xl text-white font-medium">
                Add Video
              </CardTitle>
            </CardHeader>

            <CardContent>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-7"
              >

                <FieldGroup>

                  {/* Title */}
                  <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>

                        <FieldLabel className="mb-2 text-[#CBD5E1]">
                          Title
                        </FieldLabel>

                        <InputGroup className="focus-visible:border-ring focus-visible:right-3 focus-visible:ring-[#8B5CFF]/30" >

                            <Input
                            {...field}
                            placeholder=" Enter video title"
                            className="h-14 rounded-[12px] border-[#2A3348] bg-[#111827] text-white placeholder:text-[#64748B] "
                            />

                            <InputGroupAddon align="block-end">

                            <InputGroupText className="border-[#2A3348] bg-[#111827] text-[#94A3B8]">
                              {field.value.length}/30
                            </InputGroupText>

                          </InputGroupAddon>

                        </InputGroup>
                        

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}

                      </Field>
                    )}
                  />

                  {/* Description */}
                  <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>

                        <FieldLabel className="mb-2 text-[#CBD5E1]">
                          Description (optional) :
                        </FieldLabel>

                        <InputGroup>

                          <InputGroupTextarea
                            {...field}
                            rows={5}
                            placeholder="Enter video description"
                            className="min-h-28 resize-none rounded-[12px] border-[#2A3348] bg-[#111827] text-white focus:border-none outline-none placeholder:text-[#64748B]"
                          />

                          <InputGroupAddon align="block-end">

                            <InputGroupText className="border-[#2A3348] bg-[#111827] text-[#94A3B8]">
                              {(field.value ?? "").length}/200
                            </InputGroupText>

                          </InputGroupAddon>

                        </InputGroup>

                        <FieldDescription className="text-[#64748B]">
                          Add short description for your saved video.
                        </FieldDescription>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}

                      </Field>
                    )}
                  />

                  {/* Link */}
                  <Controller
                    name="link"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>

                        <FieldLabel className="mb-2 text-[#CBD5E1]">
                          Video Link
                        </FieldLabel>

                        <div className="relative">

                          <Link2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8B5CFF]" />

                          <Input
                            {...field}
                            placeholder="https://youtube.com/..."
                            className="h-14 rounded-[12px] border-[#2A3348] bg-[#111827] pl-12 text-white placeholder:text-[#64748B] focus-visible:ring-[#8B5CFF]/30 focus-visible:border-ring focus-visible:ring-3 "
                          />

                        </div>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}

                      </Field>
                    )}
                  />

                </FieldGroup>

                <Field orientation="horizontal" className="w-full gap-7 flex items-center justify-center">

                  <Button type="button" onClick={() => form.reset()} className="h-14 px-6 bg-transparent border border-amber-50 text-lg font-semibold "> 
                    Reset
                  </Button>

                  <Button
                    type="submit"
                    className="h-14 rounded-[14px] border-0 bg-linear-to-r from-[#6C4DFF] to-[#8B5CFF] font-['Poppins'] text-lg font-semibold shadow-[0_0_40px_rgba(108,77,255,0.25)] transition-all duration-300 hover:scale-[1.01] hover:from-[#7C5CFF] hover:to-[#8B5CFF]"
                  >
                    <Plus size="10px" className="mr-1"  />
                    Add Video
                  </Button>

                </Field>

              </form>

            </CardContent>
          </Card>

         
    </div>
  )
}
