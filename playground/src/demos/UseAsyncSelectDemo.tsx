import { useState } from 'react';
import { useAsyncSelect } from 'usethishook';
import { buttonClass } from '../components/styles';

export const UseAsyncSelectDemo = () => {
  const selectFile = useAsyncSelect();
  const [label, setLabel] = useState('No file selected');

  const handleSelect = async () => {
    const file = await selectFile({ accept: 'image/*,.txt', multiple: false });
    if (file instanceof File) {
      setLabel(file.name);
      return;
    }
    setLabel('Cancelled');
  };

  return (
    <div className="space-y-3">
      <button type="button" className={buttonClass} onClick={() => void handleSelect()}>
        Choose file
      </button>
      <p>{label}</p>
    </div>
  );
};

export const useAsyncSelectExample = `import { useAsyncSelect } from 'usethishook';

export const FileButton = () => {
  const selectFile = useAsyncSelect();
  return (
    <button type="button" onClick={async () => {
      const file = await selectFile({ accept: 'image/*' });
      console.log(file);
    }}>
      Choose file
    </button>
  );
};`;
