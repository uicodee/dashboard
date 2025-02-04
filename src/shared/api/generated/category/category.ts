/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * FastAPI
 * OpenAPI spec version: 1.0.0
 */
import type {
  BodyCreateOrderCategoryCategoryPost,
  CreateOrderCategoryCategoryPostParams,
  DeleteOrderCategory,
  OrderCategory
} from '../../model'
import { createInstance } from '../../http/index';
import type { BodyType } from '../../http/index';


type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];


  export const getCategory = () => {
/**
 * Get all order categories
 * @summary All Order Categories
 */
const allOrderCategoriesCategoryGet = (
    
 options?: SecondParameter<typeof createInstance>,) => {
      return createInstance<OrderCategory[]>(
      {url: `/category/`, method: 'GET'
    },
      options);
    }
  /**
 * Create new order category
 * @summary Create Order Category
 */
const createOrderCategoryCategoryPost = (
    bodyCreateOrderCategoryCategoryPost: BodyType<BodyCreateOrderCategoryCategoryPost>,
    params: CreateOrderCategoryCategoryPostParams,
 options?: SecondParameter<typeof createInstance>,) => {const formData = new FormData();
formData.append('file', bodyCreateOrderCategoryCategoryPost.file)

      return createInstance<OrderCategory>(
      {url: `/category/`, method: 'POST',
      headers: {'Content-Type': 'multipart/form-data', },
       data: formData,
        params
    },
      options);
    }
  /**
 * Delete order categories
 * @summary Delete Order Categories
 */
const deleteOrderCategoriesCategoryDelete = (
    deleteOrderCategory: BodyType<DeleteOrderCategory>,
 options?: SecondParameter<typeof createInstance>,) => {
      return createInstance<unknown>(
      {url: `/category/`, method: 'DELETE',
      headers: {'Content-Type': 'application/json', },
      data: deleteOrderCategory
    },
      options);
    }
  return {allOrderCategoriesCategoryGet,createOrderCategoryCategoryPost,deleteOrderCategoriesCategoryDelete}};
export type AllOrderCategoriesCategoryGetResult = NonNullable<Awaited<ReturnType<ReturnType<typeof getCategory>['allOrderCategoriesCategoryGet']>>>
export type CreateOrderCategoryCategoryPostResult = NonNullable<Awaited<ReturnType<ReturnType<typeof getCategory>['createOrderCategoryCategoryPost']>>>
export type DeleteOrderCategoriesCategoryDeleteResult = NonNullable<Awaited<ReturnType<ReturnType<typeof getCategory>['deleteOrderCategoriesCategoryDelete']>>>
