import { Fragment } from 'react';

import DraftForm from '@/pages/texts/draft/components/draftForm';
import TextForm from '@/pages/texts/text/components/textForm';
import ImageForm from '@/pages/picture/ImageForm';
import AudioForm from '@/pages/audio/AudioForm';

import type { FC } from 'react';

const GlobalForm: FC = () => {
  return (
    <Fragment>
      <DraftForm />
      <TextForm />
      <ImageForm />
      <AudioForm />
    </Fragment>
  );
};

export default GlobalForm;
