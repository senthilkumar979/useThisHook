import { render, screen } from '@testing-library/react';
import { useRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { useOnClickOutside } from './useOnClickOutside';

interface TargetProps {
  onOutside: (event: MouseEvent | TouchEvent) => void;
}

const Target = ({ onOutside }: TargetProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, onOutside);

  return (
    <div>
      <div ref={ref} data-testid="inside">
        inside
      </div>
      <div data-testid="outside">outside</div>
    </div>
  );
};

describe('useOnClickOutside', () => {
  it('calls the handler when clicking outside the element', () => {
    const onOutside = vi.fn();
    render(<Target onOutside={onOutside} />);

    screen.getByTestId('outside').dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(onOutside).toHaveBeenCalledTimes(1);
  });

  it('does not call the handler when clicking inside the element', () => {
    const onOutside = vi.fn();
    render(<Target onOutside={onOutside} />);

    screen.getByTestId('inside').dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(onOutside).not.toHaveBeenCalled();
  });
});
