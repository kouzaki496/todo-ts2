import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Modal from './Modal';
import Button from '../Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
};

export default meta;

const Template: StoryFn<typeof Modal> = (args) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleConfirm = () => {
    alert('Confirmed!');
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen} label="Open Modal" />
      <Modal
        {...args}
        open={open}
        onClose={handleClose}
        onConfirm={handleConfirm}
      >
        <p>モーダルの内容がここに入ります。</p>
      </Modal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: '汎用モーダル',
};