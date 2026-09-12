import { useCounter } from 'usethishook';
import { buttonClass, ghostButtonClass } from '../components/styles';

export const UseCounterDemo = () => {
  const { count, increment, decrement, reset } = useCounter(0, 2);

  return (
    <div className="space-y-3">
      <p className="text-2xl font-semibold">{count}</p>
      <div className="flex flex-wrap gap-2">
        <button type="button" className={buttonClass} onClick={decrement}>
          -2
        </button>
        <button type="button" className={buttonClass} onClick={increment}>
          +2
        </button>
        <button type="button" className={ghostButtonClass} onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export const useCounterExample = `import { useCounter } from 'usethishook';

export const Quantity = () => {
  const { count, increment, decrement } = useCounter(1);
  return (
    <div>
      <button type="button" onClick={decrement}>-</button>
      <span>{count}</span>
      <button type="button" onClick={increment}>+</button>
    </div>
  );
};`;
