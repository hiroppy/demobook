import * as React from 'react';

export interface Props {
  value: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const Input = ({ value, placeholder, onChange }: Props) => (
  <input type="text" placeholder={placeholder} value={value} onChange={onChange} />
);
