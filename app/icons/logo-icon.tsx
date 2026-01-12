export const LogoIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 120 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <text
        x="0"
        y="32"
        fontFamily="Manrope, sans-serif"
        fontSize="28"
        fontWeight="800"
        letterSpacing="0.08em"
        fill="currentColor"
      >
        LAYER
      </text>

      <rect
        x="0"
        y="38"
        width="64"
        height="2"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
};
