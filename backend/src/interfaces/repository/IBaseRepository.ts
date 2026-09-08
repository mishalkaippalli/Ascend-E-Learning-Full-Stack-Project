import {
  HydratedDocument,
  Types,
} from "mongoose";

export interface IBaseRepository<
  TEntity extends object,
  TCreate extends Partial<TEntity>,
  TUpdate extends Partial<TEntity>,
> {
  create(
    data: TCreate,
  ): Promise<HydratedDocument<TEntity>>;

  findById(
    id: Types.ObjectId,
  ): Promise<HydratedDocument<TEntity> | null>;

  findAll(): Promise<HydratedDocument<TEntity>[]>;

  updateById(
    id: Types.ObjectId,
    data: TUpdate,
  ): Promise<HydratedDocument<TEntity> | null>;

  deleteById(
    id: Types.ObjectId,
  ): Promise<HydratedDocument<TEntity> | null>;
}