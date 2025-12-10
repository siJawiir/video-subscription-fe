/* eslint-disable @typescript-eslint/no-explicit-any */
export type PaginationParams = {
  page?: number;
  pageSize?: number;
  sortBy?: string; // bisa "field" atau "relation.field"
  sortOrder?: "asc" | "desc";
};

export type PaginatedResult<T> = {
  data: T[];
  total: number;
};

/**
 * Fully type-safe Prisma pagination helper
 * Automatically infers findMany return type (including `include` and `select`)
 */
export async function paginate<
  Delegate extends {
    count: (args: { where?: Where }) => Promise<number>;
    findMany: (args: FindManyArgs) => Promise<any>;
  },
  Where extends object,
  FindManyArgs extends {
    where?: Where;
    orderBy?: any;
    skip?: number;
    take?: number;
    include?: any;
    select?: any;
  },
  ResultArray extends Awaited<ReturnType<Delegate["findMany"]>> = Awaited<
    ReturnType<Delegate["findMany"]>
  >,
  Result = ResultArray extends Array<infer R> ? R : never
>(
  model: Delegate,
  where: Where,
  params: PaginationParams = {},
  extraArgs: Omit<
    FindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > = {} as Omit<FindManyArgs, "where" | "orderBy" | "skip" | "take">
): Promise<PaginatedResult<Result>> {
  const page = params.page && params.page > 0 ? params.page : 1;
  const pageSize =
    params.pageSize && params.pageSize > 0 ? params.pageSize : 10;
  const sortOrder = params.sortOrder === "desc" ? "desc" : "asc";

  const finalWhere = { ...where, deleted_at: null } as Where;

  // Handle nested orderBy for relation fields
  let orderBy;
  if (!params.sortBy || typeof params.sortBy === "string") {
    if (params.sortBy?.includes(".")) {
      const [relation, field] = params.sortBy.split(".");
      orderBy = { [relation]: { [field]: sortOrder } };
    } else {
      orderBy = { [params.sortBy || "id"]: sortOrder };
    }
  } else {
    // jika sudah object
    orderBy = params.sortBy;
  }

  const [total, data] = await Promise.all([
    model.count({ where: finalWhere }),
    model.findMany({
      where: finalWhere,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      ...extraArgs,
    } as FindManyArgs),
  ]);

  return { data, total };
}
