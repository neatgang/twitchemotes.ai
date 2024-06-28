"use client"

interface FooterProps {
    title: string;
    authorLabel?: string;
    createdAtLabel?: string;
    isFavorite?: boolean;
    orgId?: string;
}

export const Footer = ({
    title,
    authorLabel,
    createdAtLabel,
    isFavorite,
    orgId,
}: FooterProps) => {
    return (
        <div className="p-4 bg-white border-t">
            {/* <h3 className="text-lg font-semibold truncate">{title}</h3>
            <p className="text-sm text-gray-600">{authorLabel}</p>
            <p className="text-xs text-gray-500">{createdAtLabel}</p> */}
            {isFavorite && (
                <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-1">
                    Favorite
                </span>
            )}
        </div>
    );
}