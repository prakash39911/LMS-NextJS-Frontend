import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import {
  createCourseFormSchema,
  createCourseFormSchemaType,
} from "@prakash39911/sharedlms";
import { ReactNode } from "react";

export const useFormCreateCourse = () =>
  useForm<createCourseFormSchemaType>({
    resolver: zodResolver(createCourseFormSchema),
    defaultValues: {
      title: "",
      section: [{ sectionName: "", videoSection: [{ video_title: "" }] }],
    },
  });

export const FormProviderCreateCourse = ({
  children,
}: {
  children: ReactNode;
}) => {
  const methods = useFormCreateCourse();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export const useFormContextCreateCourse = () =>
  useFormContext<createCourseFormSchemaType>();
