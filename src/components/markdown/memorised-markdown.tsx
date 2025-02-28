import { marked } from "marked";
import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function parseMarkdownIntoBlocks(markdown: string): string[] {
    const token = marked.lexer(markdown);
    return token.map((t) => t.raw);
}

const MemoizedMarkdownBlock = memo(
    ({ content }: { content: string }) => {
        return (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        );
    },
    (prevProps, nextProps) => {
        if (prevProps.content !== nextProps.content) {
            return false;
        }
        return true;
    }
);

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock";

export const MemoizedMarkdown = memo(
    ({ content, id }: { content: string; id: string }) => {
        const blocks = parseMarkdownIntoBlocks(content);
        return blocks.map((block, index) => (
            <MemoizedMarkdownBlock
                key={`${id}-block_${index}`}
                content={block}
            />
        ));
    }
);

MemoizedMarkdown.displayName = "MemoizedMarkdown";
