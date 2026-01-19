"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import type { Table } from "@tanstack/react-table";
import { Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import React from "react";

export function DataTableViewOptions<TData>({
    table,
}: {
    table: Table<TData>;
}) {
    const columns = table
        .getAllColumns()
        .filter(
            (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide(),
        );
    const [selected, setSelected] = React.useState<Set<string>>(
        () =>
            new Set(
                columns
                    .filter((col) => !col.getIsVisible())
                    .map((col) => col.id),
            ),
    );
    const toggleColumn = (id: string) => {
        setSelected((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };
    const applyVisibility = () => {
        columns.forEach((column) => {
            column.toggleVisibility(!selected.has(column.id));
        });
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="ml-0 sm:ml-auto h-8 "
                >
                    <Settings2 />
                    View
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-[150px] bg-transparent backdrop-glass-lg"
            >
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {columns.map((column) => {
                    return (
                        <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize cursor-pointer hover:bg-white/20!"
                            checked={column.getIsVisible()}
                            onSelect={(e) => e.preventDefault()}
                            onCheckedChange={(value) =>
                                column.toggleVisibility(!!value)
                            }
                        >
                            {column.id}
                        </DropdownMenuCheckboxItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
