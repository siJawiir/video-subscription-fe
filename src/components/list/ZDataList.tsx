"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit, GripVertical, MoreHorizontal, Trash2 } from "lucide-react";
import { HTMLAttributes, useEffect, useState } from "react";
import { ZEmptyCard } from "../cards";
import { Show } from "../utils";

// ==========================
// Props Interface
// ==========================

interface ZDataListProps<T> {
  data: T[];
  getId: (item: T) => string | number;
  renderItem: (item: T, index: number) => React.ReactNode;
  onReorder?: (newOrder: T[]) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onClick?: (item: T) => void;

  enableSelection?: boolean;
  selectedIds?: Array<string | number>;
  onSelectionChange?: (selectedIds: Array<string | number>) => void;

  isDraggable?: boolean;
  orientation?: "vertical" | "horizontal";

  clasName?: HTMLAttributes<HTMLDivElement>["className"];
}

export function ZDataList<T>({
  data,
  getId,
  renderItem,
  onReorder,
  onEdit,
  onDelete,
  enableSelection = false,
  selectedIds = [],
  onSelectionChange,
  isDraggable = true,
  orientation = "vertical",
  onClick,
  clasName,
}: ZDataListProps<T>) {
  const [items, setItems] = useState<T[]>(data);
  const [activeId, setActiveId] = useState<string | number | null>(null);

  useEffect(() => {
    setItems(data);
  }, [data]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => getId(i) === active.id);
    const newIndex = items.findIndex((i) => getId(i) === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const newOrder = arrayMove(items, oldIndex, newIndex);
    setItems(newOrder);
    onReorder?.(newOrder);
  };

  if (!items || items.length === 0) {
    return <ZEmptyCard />;
  }

  return (
    <div
      className={cn(
        orientation === "horizontal"
          ? "flex space-x-3 overflow-x-auto py-1"
          : "w-full space-y-3"
      )}
    >
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={items.map((i) => getId(i))}
          strategy={
            orientation === "horizontal"
              ? horizontalListSortingStrategy
              : verticalListSortingStrategy
          }
        >
          <div className={clasName}>
            {items.map((item, index) => {
              const id = getId(item);

              return (
                <SortableListItem<T>
                  key={id}
                  id={id}
                  item={item}
                  index={index}
                  isActive={activeId === id}
                  renderItem={renderItem}
                  enableSelection={enableSelection}
                  isSelected={selectedIds.includes(id)}
                  isDraggable={isDraggable}
                  onSelectChange={(checked) => {
                    if (!onSelectionChange) return;
                    onSelectionChange(
                      checked
                        ? [...selectedIds, id]
                        : selectedIds.filter((_id) => _id !== id)
                    );
                  }}
                  onEdit={onEdit ? () => onEdit(item) : undefined}
                  onDelete={onDelete ? () => onDelete(item) : undefined}
                  onClick={
                    onClick
                      ? () => {
                          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                          !!onClick && setActiveId(id);
                          onClick?.(item);
                        }
                      : undefined
                  }
                />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

// ==========================
// Sortable Item Component
// ==========================

interface SortableListItemProps<T> {
  id: string | number;
  item: T;
  index: number;
  renderItem: (item: T, index: number) => React.ReactNode;

  enableSelection?: boolean;
  isSelected?: boolean;
  isDraggable?: boolean;

  isActive?: boolean;

  onSelectChange?: (checked: boolean) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

function SortableListItem<T>({
  id,
  item,
  index,
  renderItem,
  enableSelection,
  isSelected,
  isDraggable = true,
  isActive,
  onSelectChange,
  onEdit,
  onDelete,
  onClick,
}: SortableListItemProps<T>) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        isActive && "border-rose-500 bg-rose-50 shadow-md",
        isSelected && "border-rose-500 ring-1 ring-rose-200",
        "bg-gray-900 py-4 rounded-lg",
        onClick && "cursor-pointer"
      )}
      onClick={(e) => {
        const target = e.target as HTMLElement;

        // Hindari trigger onClick dari tombol/menu/checkbox
        if (
          target.closest("button") ||
          target.closest("[role='menu']") ||
          target.closest("input")
        )
          return;

        onClick?.();
      }}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex space-x-2 items-center justify-between px-4 w-full">
          {isDraggable && (
            <Button
              variant="ghost"
              size="icon"
              className="cursor-grab text-gray-400 hover:text-rose-500 transition-colors"
              {...attributes}
              {...listeners}
            >
              <GripVertical size={20} />
            </Button>
          )}

          {enableSelection && (
            <Checkbox
              checked={isSelected}
              onCheckedChange={(v) => onSelectChange?.(!!v)}
              className="accent-rose-500"
            />
          )}

          <div className="w-full">{renderItem(item, index)}</div>
        </div>

        <Show.When condition={!!onEdit && !!onDelete}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-rose-500 transition-colors"
              >
                <MoreHorizontal size={18} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-44 rounded-lg shadow-lg border border-gray-100"
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <Show.When condition={!!onEdit}>
                <DropdownMenuItem
                  onClick={onEdit}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-rose-50 transition-colors"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </DropdownMenuItem>
              </Show.When>

              <Show.When condition={!!onDelete}>
                <DropdownMenuItem
                  onClick={onDelete}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </DropdownMenuItem>
              </Show.When>
            </DropdownMenuContent>
          </DropdownMenu>
        </Show.When>
      </div>
    </div>
  );
}
