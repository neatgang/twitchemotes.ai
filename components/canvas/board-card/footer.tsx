interface FooterProps {
    title: string;
    authorLabel: string;
    createdAtLabel: string;
    isFavorite?: boolean; // Optional since it might not be provided
    orgId: string;
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
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm">{authorLabel}</p>
            <p className="text-xs text-gray-500">{createdAtLabel}</p>
            {isFavorite && <p className="text-xs text-red-500">Favorite</p>}
            {/* <p className="text-xs text-gray-500">Org ID: {orgId}</p> */}
        </div>
    );
}