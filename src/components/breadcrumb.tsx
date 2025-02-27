"use client";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import { Slash } from "lucide-react";
import { Fragment } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./ui/breadcrumb";

export default function Breadcumbs() {
    const items = useBreadcrumbs();
    if (items.length === 0) return null;

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index) => (
                    <Fragment key={index}>
                        {index !== items.length - 1 && (
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href={item.link}>
                                    {item.title}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        )}
                        {index < items.length - 1 && (
                            <BreadcrumbSeparator className="hidden md:block">
                                <Slash />
                            </BreadcrumbSeparator>
                        )}
                        {index === items.length - 1 && (
                            <BreadcrumbPage>{item.title}</BreadcrumbPage>
                        )}
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
