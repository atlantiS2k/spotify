'use client';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { useUploadModal } from '@/hooks/useUploadModal';

import Modal from './Modal';

const UploadModal = () => {
  const { register, handleSubmit, reset, setError } = useForm<FieldValues>({
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

  const onSubmit: SubmitHandler<FieldValues> = async values => {};

  return (
    <Modal
      title="Add a song"
      decsription="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      Form
    </Modal>
  );
};

export default UploadModal;
