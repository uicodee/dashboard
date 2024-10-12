/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * FastAPI
 * OpenAPI spec version: 1.0.0
 */
import type { OrderCategory } from './orderCategory';
import type { SkillOutput } from './skillOutput';

export interface OrderOutput {
  author: string;
  category: OrderCategory;
  createdAt: string;
  deadline: number;
  id: number;
  isExecutorSelected: boolean;
  price: number;
  skills: SkillOutput[];
  /**
   * @minLength 1
   * @maxLength 2083
   */
  technicalTask: string;
  title: string;
  updatedAt: string;
}
