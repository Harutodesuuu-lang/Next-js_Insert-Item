import { AppSidebar } from "@/components/app-sidebar";
import ProductForm from "@/components/form/product-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";

export default function Dashboard() {
  return (
    <main>
      <h1>HIIIIIII</h1>
      <Link href={"/photos/1"}> Go to photo</Link>
      <ProductForm />
    </main>
  );
}
