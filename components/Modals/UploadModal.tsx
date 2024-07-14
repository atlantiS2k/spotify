'use client';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import uniqid from 'uniqid';

import { useUploadModal } from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';

import Button from '../Button';
import Input from '../Input';
import Modal from './Modal';

const UploadModal = () => {
  const router = useRouter();
  const { user } = useUser();
  const supaBaseClient = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: '',
      image: '',
    },
  });
  const uploadModal = useUploadModal();
  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async values => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error('Missing fields');
        return;
      }
      const uniqueId = uniqid();

      const { data: songData, error: songError } = await supaBaseClient.storage
        .from('songs')
        .upload(`song-${values.title}-${uniqueId}`, songFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error('Song error upload');
      }
      const { data: imageData, error: imageError } =
        await supaBaseClient.storage
          .from('images')
          .upload(`image-${values.title}-${uniqueId}`, imageFile, {
            cacheControl: '3600',
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error('image error upload');
      }

      const { error: supaBaseError } = await supaBaseClient
        .from('songs')
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supaBaseError) {
        setIsLoading(false);
        return toast.error(supaBaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast('Song Created!!', {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error('Message error upload modal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a song"
      decsription="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="author title"
        />
        <div>
          <div className="pb-1">select a long file</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register('song', { required: true })}
            placeholder="author title"
          />
        </div>
        <div>
          <div className="pb-1">select a image file</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register('image', { required: true })}
            placeholder="Выберите файл изображения"
          />
        </div>
        <Button disabled={isLoading} type="submit" className="text-white">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
