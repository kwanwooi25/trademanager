import Dropzone from '@/components/Dropzone/BaseDropzone';
import { Button } from '@/components/ui/button';
import { LucideFileUp, LucideX } from 'lucide-react';
import type { ComponentProps } from 'react';

export default function ProductOptionImageForm({ imageFile, imageUrl, onChange, onRemove }: Props) {
  const handleDrop: ComponentProps<typeof Dropzone>['onDrop'] = async (acceptedFiles) => {
    if (!acceptedFiles.length) return;

    onChange?.({ imageFile: acceptedFiles[0] });
  };

  const hasImage = !!imageFile || !!imageUrl;
  if (hasImage) {
    return (
      <div className={'relative w-full h-full flex justify-center items-center'}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={'w-full object-center'}
          src={imageUrl || URL.createObjectURL(imageFile!)}
          alt={'product option image'}
        />
        <Button
          onClick={onRemove}
          className={'absolute top-0 right-0'}
          variant={'ghost'}
          size={'icon'}
          type={'button'}
          tabIndex={-1}
        >
          <LucideX />
        </Button>
      </div>
    );
  }

  return (
    <Dropzone
      label={
        <div className="flex flex-col items-center gap-2 py-6">
          <LucideFileUp />
          <p className="text-center text-xs">
            <span className="text-sm font-bold">Drag & Drop</span>
            <br />
            또는
            <br />
            <span className="text-sm font-bold">클릭</span>하여
            <br />
            이미지 업로드
          </p>
        </div>
      }
      accept={{
        'image/*': [],
      }}
      onDrop={handleDrop}
      maxFiles={1}
    />
  );
}

type Props = {
  imageFile?: File;
  imageUrl?: string | null;
  onChange?: (value: { imageFile?: File; imageUrl?: string }) => void;
  onRemove?: () => void;
};
