"use client";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

import { toast } from "sonner";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { title } from "process";
import { describe } from "zod/v4/core";
import {
  getCategories,
  insertProduct,
  InsertProducts,
  uploadImageToServer,
} from "@/lib/data/products";
import { Category, ProductRequest } from "@/lib/type/product";

export default function ProductForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [fileInputKey, setFileInputKey] = useState(0);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  const formSchema = z.object({
    title: z.string().min(5, "Product title atleast 5 characters long"),
    price: z.coerce
      .number({
        invalid_type_error: "This field must be a number",
      })
      .min(1, { message: "This field is required" }),
    description: z
      .string()
      .min(5, "Product title must be at least 5 characters"),
    categoryId: z.preprocess(
      (v) => Number(v),
      z.number().int().positive("Category is required"),
    ),
    images: z
      .custom<FileList | null>()
      .refine((files) => files && files.length > 0, "Please choose an image"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      categoryId: 0 as unknown as number,
      images: null,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // // console.log(values);
    // const mockProduct = {
    //   title: "Mac Mini",
    //   price: 900,
    //   descrition: "Mac Mini",
    //   categoryId: 7,
    //   images: ["https://api.escuelajs.co/api/v1/files/6840.jpg"],
    // };
    // //call insert product to api function
    // const resp = await insertProduct(mockProduct);
    // console.log("after insert product:---", resp);
    try {
      const files = values.images!;
      const filesArray = Array.from(files);

      const uploaded = await Promise.all(
        filesArray.map((f) => uploadImageToServer(f)),
      );

      const imageUrls = uploaded.map((u) => u.location);

      const payload: ProductRequest = {
        title: values.title,
        price: values.price,
        description: values.description ?? "",
        categoryId: values.categoryId,
        images: imageUrls,
      };

      const created = await InsertProducts(payload);

      alert("Product uploaded successfully!");

      form.reset();
      setFileInputKey((current) => current + 1);
    } catch (err: any) {
      alert("Failed to upload product because the items is already exis ");
      console.error(err);
    }
  }
  function onReset() {
    form.reset();
    form.clearErrors();
    setFileInputKey((current) => current + 1);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      onReset={onReset}
      className="space-y-8 @container"
    >
      <div className="grid grid-cols-12 gap-4">
        <Controller
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Product TItle</FieldLabel>

              <Input
                key="title"
                placeholder="Macbook Pro 16 inch"
                type="text"
                {...field}
                className=" border-gray-400"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="price"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Price</FieldLabel>

              <Input
                className=" border-gray-400"
                key="number-input-0"
                placeholder="2000 USD"
                type="number"
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                Product Description
              </FieldLabel>

              <Textarea
                className=" border-gray-400"
                key="textarea-0"
                id="textarea-0"
                placeholder="Product Description"
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="categoryId"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Category</FieldLabel>

              <Select
                key="categoryId"
                value={String(field.value)}
                name={field.name}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full  border-gray-400">
                  <SelectValue placeholder="Please Choose Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="images"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Choose Images</FieldLabel>

              <Input
                className=" border-gray-400"
                key={setFileInputKey}
                type="file"
                multiple
                onChange={(e) => field.onChange(e.target.files)}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="submit"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="hidden w-auto!">Submit</FieldLabel>

              <Button
                key="submit-button-0"
                id="submit"
                name=""
                className="w-full"
                type="submit"
                variant="default"
              >
                Submit
              </Button>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="reset"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="hidden w-auto!">Reset</FieldLabel>

              <Button
                key="reset-button-0"
                id="reset"
                name=""
                className="w-full  border-gray-400"
                type="reset"
                variant="outline"
              >
                Reset
              </Button>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </form>
  );
}
