import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductResponse } from "@/lib/type/product";

export function ProductCard({
  images = [
    "https://i.pinimg.com/1200x/38/cd/ad/38cdad22a8004d5911a7b369096e39bf.jpg",
  ],
  title = "Shirt",
  description = "The goats' shirt ",
  price = 20,
}: ProductResponse) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={images[0]}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover "
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{price}</Badge>
        </CardAction>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View</Button>
      </CardFooter>
    </Card>
  );
}
