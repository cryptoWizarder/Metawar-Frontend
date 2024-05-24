'use client'

import { useEffect } from 'react';
import Signup from './components/Modals/Signup';
import Signin from './components/Modals/Signin';
import VerifyEmail from './components/Modals/VerifyEmail';
import { useModal } from "./hooks/use-modal";
import WalletModal from './components/Modals/WalletModal';
import VerificationCode from './components/Modals/VerificationCode';
import ChangeEmailModal from './components/Modals/ChangeEmail';

export default function RegisterProvider({children}: { children: React.ReactNode }) {
  const { register } = useModal();

  useEffect(() => {
    register('signin', Signin);
    register('signup', Signup);
    register('verify-email', VerifyEmail);
    register('walletModal', WalletModal);
    register('verify-code', VerificationCode);
    register('change-email', ChangeEmailModal);
  }, [])
  return (
    <>
        {children}
    </>
  );
}
