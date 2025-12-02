import { useAuthStore } from '@/stores/authStore'
import AdminOverview from './admin/AdminOverview'
import HostOverview from './host/HostOverview'
import GuestOverview from './guest/GuestOverview'
import MotoristOverview from './motorist/MotoristOverview'

export default function Overview() {
  const { user } = useAuthStore()

  if (user?.role === 'ADMIN') return <AdminOverview />
  if (user?.role === 'HOST') return <HostOverview />
  if (user?.role === 'MOTORIST') return <MotoristOverview />
  return <GuestOverview />
}
