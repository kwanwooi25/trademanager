import { SalesChannel } from '@prisma/client';
import { SalesChannelFormSchema } from './formSchema';

export function getDefaultFormValues(args?: Args): SalesChannelFormSchema {
  const { salesChannel } = args ?? {};
  if (!salesChannel) {
    return { name: '', url: '' };
  }

  const { id, name, url } = salesChannel;

  return { id, name, url: url ?? '' };
}

type Args = {
  salesChannel?: SalesChannel | null;
};
