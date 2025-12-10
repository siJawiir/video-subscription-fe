"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

import React from "react";

export type ZBreadCrumbItem = {
  label: string;
  href?: string;
};

interface ZBreadCrumbProps {
  items: ZBreadCrumbItem[];
}

export default function ZBreadCrumb({ items }: ZBreadCrumbProps) {
  const lastIndex = items.length - 1;

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center space-x-1">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {index === lastIndex ? (
                <BreadcrumbPage className="text-white font-semibold drop-shadow-[0_0_2px_#ff3c78]">
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href={item.href}
                  className="text-rose-300 hover:text-rose-100 hover:drop-shadow-[0_0_4px_#ff3c78] transition-all"
                >
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>

            {index !== lastIndex && (
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4 text-rose-950 drop-shadow-[0_0_3px_#ff3c78]" />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
