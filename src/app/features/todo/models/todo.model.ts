import { Categories } from "./todo-category.types";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  category: Categories;
  createdAt: number;
}