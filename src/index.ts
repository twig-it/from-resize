import { fromResize } from "@samskara-ui/from-resize";
import "./styles.css";

const containerDiv = document.getElementById("app-content");

// Add contents
const content: HTMLElement = document.createElement("div")!;
content.className = "flex-item";

containerDiv!.appendChild(content);

fromResize(content).subscribe((dimension: ClientRect) =>
  console.log(
    `From Resize -> Dimension Updated. New Client Rect: ${JSON.stringify(
      dimension
    )}`
  )
);

setInterval(() => {
  const newWidth = `${Math.floor(Math.max(10, Math.random() * 100))}%`;
  content.style.width = newWidth;
  console.log(`Set Interval -> Changed width to ${newWidth}`);
}, 3000);
