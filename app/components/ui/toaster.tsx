// Ported from web - UI primitive
import React from 'react';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  dismiss,
} from './toast';
import { useToast } from './use-toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      <ToastViewport>
        {toasts.map(({ id, title, description, action }) => (
          <Toast key={id}>
            <React.Fragment>
              <React.Fragment>
                {title ? <ToastTitle>{title}</ToastTitle> : null}
                {description ? <ToastDescription>{description}</ToastDescription> : null}
              </React.Fragment>
              {action}
              <ToastClose onPress={() => dismiss(id)} />
            </React.Fragment>
          </Toast>
        ))}
      </ToastViewport>
    </ToastProvider>
  );
}
