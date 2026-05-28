"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { playlistProp } from "@/types/playlist"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Plus,
} from "lucide-react"
import axios from "axios"
import { Dispatch, SetStateAction, useState } from "react"

type PlanType = {
  id: string;
  title: string;
  description: string;
};

const plans: PlanType[] = [
  {
    id: "public",
    title: "Public",
    description: "Visible and accessible to everyone.",
  },
  {
    id: "private",
    title: "Private",
    description: "Accessible only to you.",
  },
];

const formSchema = z.object({
  playlistName: z
    .string()
    .min(3, "Title must be at least 3 characters.")
    .max(30, "Title must be less than 30 characters."),

  description: z
    .string()
    .max(200, "Description must be less than 200 characters.")
    .optional(),

  visible: z.enum(["public", "private"]),
})

export function PlaylistForm({ reqLink, setPlaylist }: PlaylistFormProp) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      playlistName: "",
      description: "",
      visible: "private",
    },
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (input: z.infer<typeof formSchema>) => {
    try {

      setLoading(true)

      const { playlistName, description, visible} = input


      const res = await axios({
          method: "POST",
          url: reqLink,
          data: {
              title: playlistName, description, visible
          }
      })

      if( res.status === 200 ) {
        const { playlist } = res.data

        setPlaylist((prev) => [...prev, {
          id: playlist.id,
          title: playlist.title,
          videoLength: 0,
          visible: playlist.visible
        }])

        form.reset()

      }
      
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
          setError(
              err.response?.data?.message || 
              err.message || 
              "Something went wrong"
          )
      } else if (err instanceof Error) {
          setError(err.message)
      } else {
          setError("Unknown error occurred")
      }
    }
    finally {
      setLoading(false)
    }
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    
    toast.success("Playlist Added Successfully", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-xl bg-[#111827] p-4 text-white">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),

    })

    handleSubmit(data)
  }

  return (
    <div className="relative overflow-hidden p-1 md:p-8 text-white">

          {/* Form Card */}
          <Card className=" rounded-md md:rounded-[28px] border border-[#1F2937] bg-[rgba(11,16,35,0.72)] shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-lg">

            <CardHeader className="flex justify-center">
              <CardTitle className="font-['Poppins'] text-xl text-white font-medium">
                Add Playlist
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
                    name="playlistName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>

                        <FieldLabel className="mb-2 text-[#CBD5E1]">
                          Playlist Name :
                        </FieldLabel>

                        <InputGroup className="focus-visible:border-ring focus-visible:right-3 focus-visible:ring-[#8B5CFF]/30" >

                            <Input
                            {...field}
                            placeholder="Enter playlist name "
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
                    name="visible"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>

                        <RadioGroup
                          name={field.name}
                          value={field.value || "private"}
                          onValueChange={field.onChange}
                          aria-invalid={fieldState.invalid}
                          className="grid grid-cols-2 gap-3"
                        >
                          {plans.map((plan) => {
                            const isSelected = (field.value || "private") === plan.id;

                            return (
                              <FieldLabel
                                key={plan.id}
                                htmlFor={`form-rhf-radiogroup-${plan.id}`}
                                className={`
                                  group relative cursor-pointer rounded-xl border px-3 py-2 transition-all duration-200
                                  ${
                                    isSelected
                                      ? "border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.12)]"
                                      : "border-white/20 bg-white/2 hover:border-white/40 hover:bg-white/4"
                                  }
                                `}
                              >
                                <Field
                                  orientation="horizontal"
                                  data-invalid={fieldState.invalid}
                                  className="flex items-center justify-between gap-2"
                                >
                                  <FieldContent className="space-y-1">
                                    <FieldTitle className="text-base font-semibold capitalize text-white leading-none">
                                      {plan.title}
                                    </FieldTitle>

                                    <FieldDescription className="text-xs text-zinc-400 leading-tight">
                                      {plan.description}
                                    </FieldDescription>
                                  </FieldContent>

                                  <RadioGroupItem
                                    value={plan.id}
                                    id={`form-rhf-radiogroup-${plan.id}`}
                                    aria-invalid={fieldState.invalid}
                                    className="
                                      border-white/40 text-blue-500
                                      data-[state=checked]:border-blue-500
                                      data-[state=checked]:bg-blue-500
                                    "
                                  />
                                </Field>
                              </FieldLabel>
                            );
                          })}
                        </RadioGroup>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}

                      </Field>
                    )}
                  />

                </FieldGroup>

                {error && <div className="text-red-500 font-normal">{error}</div>}

                <Field orientation="horizontal" className="w-full gap-7 flex items-center justify-center">

                  <Button disabled={loading} type="button" onClick={() => form.reset()} className="h-14 px-6 bg-transparent border border-amber-50 text-lg font-semibold disabled:opacity-55 "> 
                    Reset
                  </Button>

                  <Button
                    disabled={loading}
                    type="submit"
                    className="h-14 pr-4 rounded-[14px] border-0 bg-linear-to-r from-[#6C4DFF] to-[#8B5CFF] font-['Poppins'] text-lg font-semibold shadow-[0_0_40px_rgba(108,77,255,0.25)] transition-all duration-300 hover:scale-[1.01] hover:from-[#7C5CFF] hover:to-[#8B5CFF] disabled:opacity-55"
                  >
                    <Plus size="10px" className="mr-1"  />
                    Playlist
                  </Button>

                </Field>

              </form>

            </CardContent>
          </Card>

         
    </div>
  )
}


interface PlaylistFormProp {
  reqLink: string;
  setPlaylist: Dispatch<SetStateAction<playlistProp[]>>
}
