interface BrandMarkProps {
  size?: 'sm' | 'md';
}

export const BrandMark = ({ size = 'md' }: BrandMarkProps) => {
  const iconSize = size === 'sm' ? 'h-8 w-8 text-[0.6rem]' : 'h-10 w-10 text-[0.7rem]';
  const labelSize = size === 'sm' ? 'text-base' : 'text-lg';

  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className={`grid place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-sky-500 font-bold tracking-tight text-white ${iconSize}`}
      >
        uTH
      </span>
      <span className={`font-semibold tracking-tight text-white ${labelSize}`}>useThisHook</span>
    </span>
  );
};
