import { useRef, type ChangeEvent } from 'react';
import { RiImageUploadLine } from 'react-icons/ri';

import useEditorStore from '@/stores/useEditorStore';

import Button from '../Button';
import type { UploadImageProps } from './View.types';

const UploadImage = ({ className }: UploadImageProps) => {
  const addImage = useEditorStore((state) => state.addImage);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickUpload = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];

    const fr = new FileReader();
    fr.onload = () => {
      const img = new Image();

      img.onload = () => {
        if (typeof fr.result === 'string')
          addImage(file.name, fr.result, img.width, img.height);
      };

      if (typeof fr.result === 'string') img.src = fr.result;
    };
    fr.readAsDataURL(file);

    e.target.value = '';
  };

  return (
    <>
      <Button type="button" className={className} onClick={handleClickUpload}>
        <RiImageUploadLine size={48} />
        <p>Image</p>
      </Button>
      <input hidden ref={inputRef} type="file" onChange={handleUpload} />
    </>
  );
};

export default UploadImage;
