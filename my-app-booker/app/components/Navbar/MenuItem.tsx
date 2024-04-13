interface MenutItemInterface {
    onSelectMenuItem: () => void;
    label: string;
}

export default function MenuItem({ onSelectMenuItem, label} : MenutItemInterface) {
    return (
        <div className="px-4 py-3 hover:bg-neutral-100 font-semibold " onClick={() => onSelectMenuItem()}>
         { label }

        </div>
    )
}