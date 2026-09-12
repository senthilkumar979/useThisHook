import { useDisclosure } from 'usethishook';
import { buttonClass, ghostButtonClass } from '../components/styles';

export const UseDisclosureDemo = () => {
  const { isOpen, open, close, toggle } = useDisclosure();

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button type="button" className={buttonClass} onClick={open}>
          Open menu
        </button>
        <button type="button" className={ghostButtonClass} onClick={toggle}>
          Toggle
        </button>
      </div>
      {isOpen && (
        <div className="rounded-md border border-slate-600 p-4">
          <p>Menu content</p>
          <button type="button" className={`${ghostButtonClass} mt-3`} onClick={close}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export const useDisclosureExample = `import { useDisclosure } from 'usethishook';

export const Menu = () => {
  const { isOpen, open, close } = useDisclosure();
  return (
    <>
      <button type="button" onClick={open}>Open</button>
      {isOpen && (
        <div>
          Menu
          <button type="button" onClick={close}>Close</button>
        </div>
      )}
    </>
  );
};`;
