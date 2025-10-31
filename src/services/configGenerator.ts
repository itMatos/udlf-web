import type { ConfigParameter, ConfigTemplate } from '@/ts/types/generatorTypes';
import { formatValue } from './formatters';

export class ConfigGenerator {
  private templates: ConfigTemplate[];

  constructor(templates: ConfigTemplate[]) {
    this.templates = templates;
  }

  private generateSection(template: ConfigTemplate): string {
    const header = `#########################\n# ${template.section} #\n#########################`;

    const parameters = template.parameters.map((param) => this.formatParameter(param)).join('\n');

    return `${header}\n${parameters}\n`;
  }

  private formatParameter(param: ConfigParameter): string {
    const value = formatValue(param.value);
    const comment = param.description ? ` #${param.description}` : '';
    return `${param.key} = ${value}${comment}`;
  }

  generate(): string {
    return this.templates.map((template) => this.generateSection(template)).join('\n\n');
  }

  generateFile(): Blob {
    const content = this.generate();
    return new Blob([content], { type: 'text/plain' });
  }
}
