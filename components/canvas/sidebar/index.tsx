import { List } from "./list"
import { NewButton } from "./new-button"

export const BoardSidebar = () => {
    return (
        <aside className="fixed z-[1] left-0 border-r h-full w-[60px] p-3 flex-col gap-y-4 text-white">
            <List />
            <NewButton />
        </aside>
    )
}
