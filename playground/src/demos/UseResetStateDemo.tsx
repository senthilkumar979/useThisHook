import { useState } from 'react';
import { useResetState } from 'usethishook';
import { buttonClass, ghostButtonClass, inputClass } from '../components/styles';

const users = [
  { id: 'a', name: 'Ada' },
  { id: 'b', name: 'Grace' },
];

export const UseResetStateDemo = () => {
  const [userId, setUserId] = useState('a');
  const user = users.find((item) => item.id === userId) ?? users[0]!;
  const [draft, setDraft] = useResetState(userId, user.name);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {users.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === userId ? buttonClass : ghostButtonClass}
            onClick={() => setUserId(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <input className={inputClass} value={draft} onChange={(event) => setDraft(event.target.value)} />
      <p>Switch users: the draft resets. Stay on the same user: your typing is kept.</p>
    </div>
  );
};

export const useResetStateExample = `import { useResetState } from 'usethishook';

export const Editor = ({ user }: { user: { id: string; name: string } }) => {
  const [name, setName] = useResetState(user.id, user.name);
  return <input value={name} onChange={(event) => setName(event.target.value)} />;
};`;
