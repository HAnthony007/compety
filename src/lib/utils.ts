import { clsx, type ClassValue } from "clsx";
import internal from "stream";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface StringMap {
    [key: string]: string;
}

export const convertZodErrors = (error: ZodError): StringMap => {
    return error.issues.reduce((acc: { [key: string]: string }, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
    }, {});
};

export const streamToBuffer = async (
    stream: internal.Readable
): Promise<Buffer> => {
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
};
