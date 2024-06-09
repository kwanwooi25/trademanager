import { auth } from '.';

export async function getCompanyIdFromSession() {
  const session = await auth();
  return session?.user?.companyId;
}
