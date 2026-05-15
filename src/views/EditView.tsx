import {
  TemplateHeader,
  ImageEditor,
  VariableEditor,
} from 'laser-template-builder';
import type { Template, ImageTextboxVariable, ExportRequest } from 'laser-template-builder';
import { exportFile } from '../lib/clientProcess';

interface EditViewProps {
  template: Template;
  fileContent: string | ArrayBuffer;
  imageBlobUrl?: string;
  onBack: () => void;
  onUpdateTemplate: (t: Template) => void;
}

export function EditView({
  template,
  fileContent,
  imageBlobUrl,
  onBack,
  onUpdateTemplate,
}: EditViewProps) {
  async function handleRename(name: string) {
    onUpdateTemplate({ ...template, name });
  }

  async function handleDelete() {
    onBack();
  }

  async function handleConvertToImage() {
    onUpdateTemplate({ ...template, sourceFormat: 'IMAGE' });
  }

  async function handleSaveBoxes(boxes: ImageTextboxVariable[]) {
    onUpdateTemplate({ ...template, variables: boxes });
  }

  async function handleExport(request: ExportRequest) {
    return exportFile(request, fileContent, template.variables, template.name);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TemplateHeader
        template={template}
        backHref="#"
        onRename={handleRename}
        onDelete={handleDelete}
        onConvertToImage={handleConvertToImage}
      />

      <div className="max-w-5xl mx-auto p-6">
        {template.sourceFormat === 'IMAGE' ? (
          <ImageEditor
            template={template}
            imageUrl={imageBlobUrl ?? (fileContent as string)}
            onSaveBoxes={handleSaveBoxes}
          />
        ) : (
          <VariableEditor
            template={template}
            onExport={handleExport}
          />
        )}
      </div>
    </div>
  );
}
