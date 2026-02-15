/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  activities: {
    list: FunctionReference<"query", "public", { limit?: number }, any>;
    create: FunctionReference<"mutation", "public", any, any>;
  };
  calendar: {
    list: FunctionReference<"query", "public", {}, any>;
    upcoming: FunctionReference<"query", "public", { limit?: number }, any>;
    create: FunctionReference<"mutation", "public", any, any>;
  };
  contacts: {
    list: FunctionReference<"query", "public", {}, any>;
    create: FunctionReference<"mutation", "public", any, any>;
  };
  content: {
    list: FunctionReference<"query", "public", {}, any>;
    byStatus: FunctionReference<"query", "public", { status: string }, any>;
    create: FunctionReference<"mutation", "public", any, any>;
    updateStatus: FunctionReference<"mutation", "public", any, any>;
  };
  ecosystem: {
    list: FunctionReference<"query", "public", {}, any>;
    bySlug: FunctionReference<"query", "public", { slug: string }, any>;
    create: FunctionReference<"mutation", "public", any, any>;
  };
  tasks: {
    list: FunctionReference<"query", "public", {}, any>;
    create: FunctionReference<"mutation", "public", any, any>;
    update: FunctionReference<"mutation", "public", any, any>;
  };
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
