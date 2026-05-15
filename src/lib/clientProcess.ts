import {
  extractSvgTokens,
  renderSvgFile,
  extractLightBurnTokens,
  renderLightBurnFile,
  extractXcsTokens,
  renderXcsFile,
} from 'laser-template-builder';
import type { TemplateVariable, SourceFormat, ExportRequest, Template } from 'laser-template-builder';

export interface UploadOutput {
  template: Template;
  fileContent: string | ArrayBuffer;
  imageBlobUrl?: string;
}

export async function upload(file: File): Promise<UploadOutput> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');

  const makeTemplate = (
    sourceFormat: SourceFormat,
    variables: TemplateVariable[],
  ): Template => ({
    id: crypto.randomUUID(),
    name: nameWithoutExt,
    sourceFormat,
    variables,
    filePath: file.name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  if (ext === 'svg') {
    const text = await file.text();
    const tokens = extractSvgTokens(text);
    return { template: makeTemplate('SVG', tokens), fileContent: text };
  }

  if (ext === 'lbrn2') {
    const text = await file.text();
    const tokens = extractLightBurnTokens(text);
    return { template: makeTemplate('LBRN2', tokens), fileContent: text };
  }

  if (ext === 'xcs') {
    const buf = await file.arrayBuffer();
    const tokens = await extractXcsTokens(buf);
    return { template: makeTemplate('XCS', tokens), fileContent: buf };
  }

  // image formats
  const blobUrl = URL.createObjectURL(file);
  return {
    template: makeTemplate('IMAGE', []),
    fileContent: blobUrl,
    imageBlobUrl: blobUrl,
  };
}

export async function exportFile(
  request: ExportRequest,
  fileContent: string | ArrayBuffer,
  variables: TemplateVariable[],
  templateName: string,
): Promise<{ blob: Blob; filename: string }> {
  const { outputFormat, variableValues } = request;
  const baseName = templateName || 'template';

  if (outputFormat === 'SVG') {
    const out = renderSvgFile(fileContent as string, variables, variableValues);
    return { blob: new Blob([out], { type: 'image/svg+xml' }), filename: `${baseName}.svg` };
  }

  if (outputFormat === 'LBRN2') {
    const out = renderLightBurnFile(fileContent as string, variables, variableValues);
    return { blob: new Blob([out], { type: 'application/xml' }), filename: `${baseName}.lbrn2` };
  }

  if (outputFormat === 'XCS') {
    const out = await renderXcsFile(fileContent as ArrayBuffer, variables, variableValues);
    return { blob: new Blob([out], { type: 'application/zip' }), filename: `${baseName}.xcs` };
  }

  throw new Error(`Unsupported output format: ${outputFormat}`);
}
