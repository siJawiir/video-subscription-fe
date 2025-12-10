import { NextResponse } from "next/server";
import { logInfo, logError, toMeta } from "@/lib/logger";
import { ApiError } from "@/lib/errors";

/**
 * Handler GET by unique field
 */
export async function handleGetByUniqueField<
  T,
  F extends Record<string, string | number>
>(context: string, fetchDataFn: (filter: F) => Promise<T | null>, filter: F) {
  try {
    if (Object.keys(filter).length === 0)
      throw new ApiError("Filter is empty", 400);

    const data = await fetchDataFn(filter);
    if (!data)
      throw new ApiError(
        `Data not found for filter: ${JSON.stringify(filter)}`,
        404
      );

    logInfo(context, "Successfully fetched data", toMeta(data));

    return NextResponse.json({
      success: true,
      message: "Data successfully fetched",
      data,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      logError(context, error.message, toMeta(error));
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.status }
      );
    } else {
      logError(context, error);
      return NextResponse.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}

/**
 * Handler LIST (GET all)
 */
export async function handleList<T>(
  context: string,
  fetchDataFn: () => Promise<{ data: T[]; total: number }>
) {
  try {
    const res = await fetchDataFn();
    logInfo(context, "Successfully fetched paginated list", toMeta(res));
    return NextResponse.json({
      success: true,
      message: "Paginated list successfully fetched",
      data: {
        total: res.total,
        data: res.data,
      },
    });
  } catch (error) {
    logError(context, error, toMeta(error));
    return NextResponse.json(
      { success: false, message: "Failed to fetch paginated list" },
      { status: 500 }
    );
  }
}

/**
 * Handler CREATE
 */
export async function handleCreate<T, D extends object>(
  context: string,
  createDataFn: (data: D) => Promise<T>,
  body: D
) {
  try {
    const newData = await createDataFn(body);
    logInfo(context, "Successfully created", toMeta(newData));
    return NextResponse.json({
      success: true,
      message: "Data successfully created",
      data: newData,
    });
  } catch (error) {
    logError(context, error, toMeta(error));
    return NextResponse.json(
      { success: false, message: "Failed to create data" },
      { status: 500 }
    );
  }
}

/**
 * Handler UPDATE by unique field
 */
export async function handleUpdate<
  T,
  D extends object,
  F extends Record<string, string | number>
>(
  context: string,
  updateDataFn: (filter: F, data: D) => Promise<T>,
  filter: F,
  body: D
) {
  try {
    const updated = await updateDataFn(filter, body);
    logInfo(context, "Successfully updated", toMeta(updated));
    return NextResponse.json({
      success: true,
      message: "Data successfully updated",
      data: updated,
    });
  } catch (error) {
    logError(context, error, toMeta(error));
    return NextResponse.json(
      { success: false, message: "Failed to update data" },
      { status: 500 }
    );
  }
}

/**
 * Handler DELETE by unique field
 */
export async function handleDelete<
  T,
  F extends Record<string, string | number>
>(context: string, deleteDataFn: (filter: F) => Promise<T>, filter: F) {
  try {
    const deleted = await deleteDataFn(filter);
    logInfo(context, "Successfully deleted", toMeta(deleted));
    return NextResponse.json({
      success: true,
      message: "Data successfully deleted",
      data: deleted,
    });
  } catch (error) {
    logError(context, error, toMeta(error));
    return NextResponse.json(
      { success: false, message: "Failed to delete data" },
      { status: 500 }
    );
  }
}
