import { useState } from 'react';
import { UploadView } from './views/UploadView';
import { EditView } from './views/EditView';
import { DonateWidget } from './components/DonateWidget';
import type { UploadOutput } from './lib/clientProcess';
import type { Template } from 'laser-template-builder';

type AppState =
  | { view: 'upload' }
  | {
      view: 'edit';
      template: Template;
      fileContent: string | ArrayBuffer;
      imageBlobUrl?: string;
    };

export default function App() {
  const [state, setState] = useState<AppState>({ view: 'upload' });

  function handleReady({ template, fileContent, imageBlobUrl }: UploadOutput) {
    setState({ view: 'edit', template, fileContent, imageBlobUrl });
  }

  function handleBack() {
    setState({ view: 'upload' });
  }

  function handleUpdateTemplate(template: Template) {
    if (state.view !== 'edit') return;
    setState({ ...state, template });
  }

  if (state.view === 'upload') {
    return (
      <>
        <UploadView onReady={handleReady} />
        <DonateWidget />
      </>
    );
  }

  return (
    <>
      <EditView
        template={state.template}
        fileContent={state.fileContent}
        imageBlobUrl={state.imageBlobUrl}
        onBack={handleBack}
        onUpdateTemplate={handleUpdateTemplate}
      />
      <DonateWidget />
    </>
  );
}
