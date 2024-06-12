import SalesChannelListPage from '@/components/pages/SalesChannelList';
import { DEFAULT_PER } from '@/const/api';
import { PATHS } from '@/const/paths';
import { withAuth } from '@/lib/auth/hoc';
import { getUrl } from '@/lib/url';
import { getSalesChannels } from '@/services/salesChannel';
import { redirect } from 'next/navigation';

export default withAuth(async () => {
  const { searchParams } = getUrl();
  const page = +(searchParams.get('page') ?? 1);
  const per = +(searchParams.get('per') ?? DEFAULT_PER);
  const search = searchParams.get('search') ?? '';

  const res = await getSalesChannels({
    page,
    per,
    search,
  });

  if (page > 1 && !res.salesChannels.length) {
    return redirect(PATHS.SALES_CHANNEL_LIST);
  }

  return <SalesChannelListPage {...res} />;
});
