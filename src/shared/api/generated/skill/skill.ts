/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * FastAPI
 * OpenAPI spec version: 1.0.0
 */
import type {
  DeleteSkill,
  SkillInput,
  SkillOutput,
  UpdateSkill
} from '../../model'
import { createInstance } from '../../http/index';
import type { BodyType } from '../../http/index';


type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];


  export const getSkill = () => {
/**
 * Get all skills
 * @summary All Skills
 */
const allSkillsSkillAllGet = (
    
 options?: SecondParameter<typeof createInstance>,) => {
      return createInstance<SkillOutput[]>(
      {url: `/skill/all`, method: 'GET'
    },
      options);
    }
  /**
 * Create new skill
 * @summary Create Skill
 */
const createSkillSkillNewPost = (
    skillInput: BodyType<SkillInput>,
 options?: SecondParameter<typeof createInstance>,) => {
      return createInstance<SkillOutput>(
      {url: `/skill/new`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: skillInput
    },
      options);
    }
  /**
 * Update skill
 * @summary Update Skill
 */
const updateSkillSkillUpdatePut = (
    updateSkill: BodyType<UpdateSkill>,
 options?: SecondParameter<typeof createInstance>,) => {
      return createInstance<SkillOutput>(
      {url: `/skill/update`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: updateSkill
    },
      options);
    }
  /**
 * Delete skill
 * @summary Delete Skill
 */
const deleteSkillSkillDeleteDelete = (
    deleteSkill: BodyType<DeleteSkill>,
 options?: SecondParameter<typeof createInstance>,) => {
      return createInstance<unknown>(
      {url: `/skill/delete`, method: 'DELETE',
      headers: {'Content-Type': 'application/json', },
      data: deleteSkill
    },
      options);
    }
  return {allSkillsSkillAllGet,createSkillSkillNewPost,updateSkillSkillUpdatePut,deleteSkillSkillDeleteDelete}};
export type AllSkillsSkillAllGetResult = NonNullable<Awaited<ReturnType<ReturnType<typeof getSkill>['allSkillsSkillAllGet']>>>
export type CreateSkillSkillNewPostResult = NonNullable<Awaited<ReturnType<ReturnType<typeof getSkill>['createSkillSkillNewPost']>>>
export type UpdateSkillSkillUpdatePutResult = NonNullable<Awaited<ReturnType<ReturnType<typeof getSkill>['updateSkillSkillUpdatePut']>>>
export type DeleteSkillSkillDeleteDeleteResult = NonNullable<Awaited<ReturnType<ReturnType<typeof getSkill>['deleteSkillSkillDeleteDelete']>>>