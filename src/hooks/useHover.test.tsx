import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useHover } from './useHover';

const HoverProbe = () => {
  const { ref, isHovered } = useHover<HTMLDivElement>();
  return (
    <div ref={ref} data-testid="card">
      {isHovered ? 'in' : 'out'}
    </div>
  );
};

describe('useHover', () => {
  it('tracks pointer enter and leave', () => {
    render(<HoverProbe />);
    const card = screen.getByTestId('card');
    expect(card.textContent).toBe('out');

    fireEvent.pointerEnter(card);
    expect(card.textContent).toBe('in');

    fireEvent.pointerLeave(card);
    expect(card.textContent).toBe('out');
  });
});
