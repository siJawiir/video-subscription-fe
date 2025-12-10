"use client";

import { Card } from "@/components/ui/card";
import { isEmpty } from "@/utils/data";
import { FileMinus } from "lucide-react";

interface Props {
  label?: string;
  description?: string;
}
export default function ZEmptyCard({ label, description }: Props) {
  return (
    <div className="w-full flex justify-center items-center p-8">
      <Card className="w-full max-w-sm p-6 text-center border-dashed border-2 border-gray-200 text-gray-400 hover:shadow-md transition-shadow duration-300">
        <div className="flex flex-col items-center gap-3">
          <FileMinus size={48} className="text-gray-300" />
          <p className="text-lg font-semibold text-gray-500">
            {!isEmpty(label) ? label : "No data available"}
          </p>
          <p className="text-sm text-gray-400">
            {!isEmpty(description)
              ? description
              : "There are no items to display right now."}
          </p>
        </div>
      </Card>
    </div>
  );
}
