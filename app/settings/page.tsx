import { PATHS } from '@/const/paths';
import { redirect } from 'next/navigation';

export default function Page() {
  return redirect(PATHS.SALES_CHANNEL_LIST);
}
