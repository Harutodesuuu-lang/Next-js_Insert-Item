export type ProductResponse = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  // category: category;
  images: [
    "https://i.pinimg.com/1200x/38/cd/ad/38cdad22a8004d5911a7b369096e39bf.jpg",
  ];
};

export type ProductRequest = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
};

export type UploadResponse = {
  originalname: string;
  filename: string;
  location: string;
};

export type Category = {
  id: number;
  name: string;
  image: string;
};
