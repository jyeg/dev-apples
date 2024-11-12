'use client';
import React from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Button, ButtonProps } from '../ui/button';

type SubmitButtonProps = ButtonProps & {
  children?: React.ReactNode;
  isPending?: boolean;
};

function SubmitButton({ isPending, children, ...rest }: SubmitButtonProps) {
  return (
    <Button {...rest} type="submit" aria-disabled={isPending}>
      {isPending && <ReloadIcon className="animate-spin mr-2" />}
      {children}
    </Button>
  );
}

export default SubmitButton;
