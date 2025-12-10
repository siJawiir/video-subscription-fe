import { ResourceType } from "resource-types";

export const SUBJECT_CATGEORIES: ResourceType[] = [
  { value: 1, label: "Akademik" },
  { value: 0, label: "Non Akademik" },
];

export const MANDATORY_CATGEORIES: ResourceType[] = [
  { value: 1, label: "Wajib" },
  { value: 0, label: "Optional" },
];

export const STATUS_OPTIONS = [
  { value: 1, label: "Aktif" },
  { value: 0, label: "Tidak Aktif" },
];

export const SEMESTER_OPTIONS = [
  { value: 'Ganjil', label: "Ganjil" },
  { value: 'Genap', label: "Genap" },
];