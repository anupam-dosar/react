import { useState } from "react";

export default function ExpanderBox({
  children,
  collapsedNumWords = 10,
  expanded = false,
  expandButtonText = "show more",
  collapseButtonText = "hide",
  buttonTextColor = "#333",
  buttonBgColor = "#fff",
  className = "",
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const displayedText = isExpanded
    ? children
    : children.split(" ").slice(0, collapsedNumWords).join(" ") + "...";

  return (
    <div className={className}>
      <span>{displayedText}</span>
      <button
        onClick={() => setIsExpanded((e) => !e)}
        style={{
          backgroundColor: buttonBgColor,
          color: buttonTextColor,
          border: "none",
          cursor: "pointer",
          marginLeft: "6px",
        }}
      >
        {isExpanded ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}
