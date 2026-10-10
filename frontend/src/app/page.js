'use client'

import { useRouter } from 'next/navigation';
import LandingPage from '@/components/home/LandingPage';
import { AuthProvider } from '@/contexts/AuthContext';

export default function Splash() {
  const router = useRouter();

  const handleEnter = () => {
    router.push('/home');
  };

  return (
    <AuthProvider>
      <LandingPage onEnter={handleEnter} />
    </AuthProvider>
  );
}
