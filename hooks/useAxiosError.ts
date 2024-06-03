import { useToast } from '@/components/ui/use-toast';
import { isAxiosError } from 'axios';

export function useAxiosError() {
  const { toast } = useToast();

  const handleAxiosError = (e: unknown) => {
    if (isAxiosError(e)) {
      return toast({
        description: e.response?.data.message || e.message,
        variant: 'destructive',
      });
    }

    return toast({
      description: (e as any).message,
      variant: 'destructive',
    });
  };

  return { handleAxiosError };
}
