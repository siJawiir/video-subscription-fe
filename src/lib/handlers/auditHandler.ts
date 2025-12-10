// lib/handlers/auditHandler.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "../authOptions";

export type AuditType = "create" | "update" | "delete";

export interface AuditFields {
  created_at?: Date;
  created_by?: number;
  updated_at?: Date;
  updated_by?: number;
  deleted_at?: Date | null;
  deleted_by?: number | null;
}

async function getUserIdFromSession(): Promise<number> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");
  return Number(session.user.id);
}

export async function setAuditFields<T extends object>(
  data: T,
  type: AuditType
): Promise<T & AuditFields> {
  const userId = await getUserIdFromSession();
  const now = new Date();
  const auditData: AuditFields = {};

  switch (type) {
    case "create":
      auditData.created_at = now;
      auditData.created_by = userId;
      auditData.updated_at = now;
      auditData.updated_by = userId;
      break;
    case "update":
      auditData.updated_at = now;
      auditData.updated_by = userId;
      break;
    case "delete":
      auditData.deleted_at = now;
      auditData.deleted_by = userId;
      break;
  }

  return { ...data, ...auditData };
}

export interface AuditFields {
  created_at?: Date;
  created_by?: number;
  updated_at?: Date;
  updated_by?: number;
  deleted_at?: Date | null;
  deleted_by?: number | null;
}

export async function getAuditData(type: AuditType): Promise<AuditFields> {
  const userId = await getUserIdFromSession();
  const now = new Date();
  const auditData: AuditFields = {};

  switch (type) {
    case "create":
      auditData.created_at = now;
      auditData.created_by = userId;
      auditData.updated_at = now;
      auditData.updated_by = userId;
      break;
    case "update":
      auditData.updated_at = now;
      auditData.updated_by = userId;
      break;
    case "delete":
      auditData.deleted_at = now;
      auditData.deleted_by = userId;
      break;
  }

  return auditData;
}
