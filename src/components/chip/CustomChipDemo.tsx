import React from "react";
import CustomChip from "./Chip";

export function CustomChipDemo() {
    const [tags, setTags] = React.useState([
      { id: 1, label: "React", removable: true },
      { id: 2, label: "Design System" },
    ]);
  
    const [selectedTag, setSelectedTag] = React.useState<number | null>(null);
  
    return (
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <CustomChip
              key={t.id}
              label={t.label}
              removable={t.removable}
              onRemove={() => setTags((prev) => prev.filter((p) => p.id !== t.id))}
              selectable
              selected={selectedTag === t.id}
              onSelect={(newState) => setSelectedTag(newState ? t.id : null)}
              icon={<span role="img" aria-label="tag" className="text-xs">🏷️</span>}
            />
          ))}
        </div>
  
        <div className="flex gap-2 items-center">
          <CustomChip label="Outlined chip" variant="outlined" />
          <CustomChip label="Subtle Chip" variant="subtle" color="emerald" />
          <CustomChip label="Small" size="sm" />
          <CustomChip label={<span className="font-medium">Custom label</span>} />
          <CustomChip
            label="Avatar"
            avatar={<img src="https://i.pravatar.cc/40" alt="avatar" />}
            removable
            onRemove={() => alert("removed")}
          />
        </div>
      </div>
    );
  }