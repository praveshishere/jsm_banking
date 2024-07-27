import React from "react"

import { z, object as ObjectType } from  "zod";
import { Control, FieldPath, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface Props<T extends ReturnType<typeof ObjectType>> {
  name: FieldPath<z.infer<T>>,
  placeholder: string,
  label: string,
  control: Control<z.infer<T>>,
  type?: "text" | "email" | "password",
  formSchema: T,
}

const CustomInput = <T extends ReturnType<typeof ObjectType>> ({ control, label, placeholder, name, type = "text" }: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label"> { label } </FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class"
                type={type}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2"/>
          </div>
        </div>
      )}
    />
  )
}

export default CustomInput