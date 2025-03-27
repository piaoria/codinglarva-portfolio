interface BaseChipProps {
  text: string;
  textColor: string;
  backgroundColor: string;
  size: "small" | "medium" | "large";
}

export default function BaseChip({
  text,
  textColor,
  backgroundColor,
  size,
}: BaseChipProps) {
  const sizeClasses = {
    small: "w-[60px]",
    medium: "w-[80px]",
    large: "w-[100px]",
  };

  return (
    <div
      className={`${sizeClasses[size]} h-[30px] rounded-[50px] flex items-center justify-center text-[12px] font-bold whitespace-pre-line text-center`}
      style={{
        color: textColor,
        backgroundColor: backgroundColor,
      }}
    >
      {text}
    </div>
  );
}
