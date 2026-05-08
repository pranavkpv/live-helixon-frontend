import type { ReactNode } from 'react';
import { DashboardShell } from '@/components/DashboardShell';
import type { User } from '@/types';
import { decodeJwtPayload, getAccessToken } from '@/utils/token';
import { redirect } from 'next/navigation';
import { EMP_NAV_SECTIONS } from '@/constants/employee';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const token = await getAccessToken();
  if (!token) redirect('/signin');

  const payload = await decodeJwtPayload(token);

  const user: User = {
    userId: payload.userId,
    name: payload.name,
    email: payload.email,
    location: payload.location,
    role: payload.role,
  };

  return (
   <DashboardShell
      user={user}
      navSections={EMP_NAV_SECTIONS}
      defaultActiveKey="enrollments"
    >
      {children}
    </DashboardShell>
  );
}