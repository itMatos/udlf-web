import type { EvaluationSettingsData } from '@/ts/interfaces';
import type { InputSettingsData } from '@/ts/interfaces/input';
import type { OutputSettingsData } from '@/ts/interfaces/output';
import type { BaseConfigType, ConfigSectionType } from '@/ts/types/config-generator';

/**
 * Função genérica para criar uma seção de configuração.
 * Abstrai a lógica repetitiva de mapear parâmetros e atualizar seus valores.
 * @param configTemplate - O template de configuração base (ex: outputFilesSettingsConfig).
 * @param valueUpdates - Um objeto onde as chaves correspondem a 'param.key' e os valores são os novos 'value'.
 * @param sectionName - (Opcional) Um novo nome para a seção.
 * @returns Um objeto de seção de configuração formatado.
 */
const createConfigSection = (configTemplate: any, valueUpdates: Record<string, any>, sectionName?: string) => {
  return {
    section: sectionName || configTemplate.section,
    parameters: configTemplate.parameters.map((param: any) => ({
      ...param,
      value: valueUpdates[param.key] ?? param.value,
    })),
  };
};

/**
 * Cria a configuração base.
 */

export const createBaseConfig = (baseConfigTemplate: BaseConfigType, selectedMethod: string) => {
  return {
    ...baseConfigTemplate,
    parameters: baseConfigTemplate.parameters.map((param: BaseConfigType['parameters'][number]) => ({
      ...param,
      value: param.key === 'UDL_METHOD' ? selectedMethod.toUpperCase() : param.value,
    })),
  };
};

/**
 * Cria a configuração de entrada (Input).
 */
export const createInputSettings = (
  inputSettings: InputSettingsData | null,
  inputDatasetFilesConfig: ConfigSectionType
) => {
  const valueUpdates = {
    INPUT_FILE_FORMAT: inputSettings?.inputType,
    INPUT_FILE_LIST: inputSettings?.inputFileList,
    INPUT_FILE_CLASSES: inputSettings?.inputFileClasses,
    INPUT_IMAGES_PATH: inputSettings?.datasetImagesPath,
  };
  return createConfigSection(inputDatasetFilesConfig, valueUpdates);
};

/**
 * Cria a configuração de saída (Output).
 */
export const createOutputSettings = (
  outputSettings: OutputSettingsData,
  outputFilesSettingsConfig: ConfigSectionType,
  fileName: string
) => {
  const valueUpdates = {
    OUTPUT_FILE_PATH: outputSettings.outputFileName ? outputSettings.outputFileName : `output_${fileName}`,
    OUTPUT_FILE: outputSettings.enabledOutput ? 'TRUE' : 'FALSE',
    OUTPUT_FILE_FORMAT: outputSettings.outputFileFormat.includes('RANKEDLIST') ? 'RK' : 'MATRIX',
    OUTPUT_MATRIX_TYPE: outputSettings.outputFileFormat.includes('DISTANCE') ? 'DIST' : 'SIM',
    OUTPUT_RK_FORMAT: outputSettings.outputFileFormat.includes('NUMERIC') ? 'NUM' : 'STR',
    OUTPUT_LOG_FILE_PATH: `log_${fileName}`,
  };
  return createConfigSection(outputFilesSettingsConfig, valueUpdates, 'OUTPUT SETTINGS');
};

/**
 * Cria a configuração de avaliação (Evaluation).
 */
export const createEvaluationSettings = (
  evaluationSettings: EvaluationSettingsData | null,
  evaluationSettingsConfig: ConfigSectionType
) => {
  // TODO: tratar caso de recall e precision vazios de forma mais robusta se necessário.
  const recallArrayToString = evaluationSettings?.recall?.join(', ') || '1';
  const precisionArrayToString = evaluationSettings?.precision?.join(', ') || '1';

  const valueUpdates = {
    EFFECTIVENESS_COMPUTE_MAP: evaluationSettings?.useMap ? 'TRUE' : 'FALSE',
    EFFICIENCY_EVAL: evaluationSettings?.useEfficiency ? 'TRUE' : 'FALSE',
    EFFECTIVENESS_RECALLS_TO_COMPUTE: recallArrayToString,
    EFFECTIVENESS_PRECISIONS_TO_COMPUTE: precisionArrayToString,
  };
  return createConfigSection(evaluationSettingsConfig, valueUpdates, 'EVALUATION SETTINGS');
};

/**
 * Cria a configuração específica do método.
 */
const createMethodSettings = (selectedMethod: string, settingsTemplate: Record<string, any> | null) => {
  return {
    section: `${selectedMethod.toUpperCase()} SETTINGS`,
    parameters: settingsTemplate ? Object.entries(settingsTemplate).map(([key, value]) => ({ key, value })) : [],
  };
};
