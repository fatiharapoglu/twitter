export const shimmer = (width: number, height: number) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    if (!ctx) return "";
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0.25, "#f6f7f8");
    gradient.addColorStop(0.5, "#edeef1");
    gradient.addColorStop(0.75, "#f6f7f8");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
};
