import { useRef } from 'react';
import { useDisclosure, useOnClickOutside } from 'usethishook';
import { buttonClass } from '../components/styles';

export const UseOnClickOutsideDemo = () => {
  const { isOpen, open, close } = useDisclosure(true);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, close);

  return (
    <div>
      <button type="button" className={buttonClass} onClick={open}>
        Show box
      </button>
      {isOpen && (
        <div ref={ref} className="mt-4 rounded-md border border-sky-500 bg-slate-950 p-4">
          Click outside this box to close it.
        </div>
      )}
    </div>
  );
};

export const useOnClickOutsideExample = `import { useRef } from 'react';
import { useOnClickOutside } from 'usethishook';

export const Popover = () => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => console.log('outside'));
  return <div ref={ref}>Popover</div>;
};`;
