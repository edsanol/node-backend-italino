export interface ICategoryDto {
  categoryId?: number;
  categoryReference: string;
  categoryName: string;
  categoryDescription: string;
  categoryStatus: string;
  createdAt?: Date;
  updatedAt?: Date;
}
