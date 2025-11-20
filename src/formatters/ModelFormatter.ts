/**
 * Model name and file formatting utility.
 *
 * This class provides methods to format model names, file names, and property names
 * based on configured naming conventions. It handles singularization and various
 * naming styles (camelCase, PascalCase, snake_case, etc.).
 *
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 * @version 0.0.3
 * @since 0.0.1
 */

// helpers
import StringHelper from '~/helpers/StringHelper';

// types
import type {GeneratorOptions, ModelNamingOptions} from '~/typings/generator';
import type {InitTemplateVars, ModelTemplateVars} from '~/core/ModelGenerator';

/**
 * A utility class for formatting model-related names based on generator options.
 * Provides methods to format model names, file names, and property names according to specified naming conventions.
 */
export default class ModelFormatter {
  /**
   * Creates an instance of ModelFormatter.
   * @param options - The generator options containing naming conventions.
   */
  private constructor(protected readonly options: GeneratorOptions) {
  }

  /**
   * Creates a new ModelTemplateVars object with all properties initialized to empty strings
   * Merges any provided partial variables with the defaults
   *
   * @function getModelTemplateVars
   * @description Factory method for creating template variables with default values.
   * This ensures all required properties are initialized with sensible defaults
   * before any generation begins.
   *
   * @param {Partial<ModelTemplateVars>} [vars={}] - Partial template variables to merge with default values
   * @returns {ModelTemplateVars} Complete ModelTemplateVars object with all properties initialized
   *
   * @example
   * ```typescript
   * const template = ModelGenerator.getModelTemplateVars({
   *   modelName: 'User',
   *   tableName: 'users'
   * });
   * ```
   */
  public static getModelTemplateVars = (vars: Partial<ModelTemplateVars> = {}): ModelTemplateVars => {
    return {
      schemaName: '',
      imports: '',
      modelsImport: '',
      modelName: '',
      enums: '',
      interfaces: '',
      tableName: '',
      fields: '',
      associations: '',
      attributes: '',
      options: '',
      typesImport: '',
      ...vars,
    };
  };

  /**
   * Creates a new InitTemplateVars object with all properties initialized to empty strings
   * Merges any provided partial variables with the defaults
   *
   * @function getInitializerTemplateVars
   * @description Factory method for creating initializer template variables.
   * Used for generating the main index file that imports and sets up all models.
   *
   * @param {Partial<InitTemplateVars>} [vars={}] - Partial template variables to merge with default values
   * @returns {InitTemplateVars} Complete InitTemplateVars object with all properties initialized
   *
   * @example
   * ```typescript
   * const initTemplate = ModelGenerator.getInitializerTemplateVars({
   *   importClasses: 'import User from \'./User\';'
   * });
   * ```
   */
  public static getInitializerTemplateVars = (vars: Partial<InitTemplateVars> = {}): InitTemplateVars => {
    return {
      importClasses: '',
      importTypes: '',
      associations: '',
      exportClasses: '',
      ...vars,
    };
  };

  /**
   * Retrieves the model naming options from the generator options.
   * @returns The model naming options.
   */
  public getOptions(): ModelNamingOptions {
    return this.options.generator?.model?.naming!;
  }

  /**
   * Creates a new instance of ModelFormatter with the provided options.
   * @param options - The generator options containing naming conventions.
   * @returns A new instance of ModelFormatter.
   */
  public static create(options: GeneratorOptions): ModelFormatter {
    return new ModelFormatter(options);
  }

  /**
   * Formats a table name into a model name based on the naming conventions.
   * @param tableName - The table name to format.
   * @returns The formatted model name.
   */
  public getModelName(tableName: string): string {
    return StringHelper.formatName(StringHelper.getModeSingularize(tableName, this.getOptions().singularizeModel), this.getOptions().model);
  }

  /**
   * Formats a table name into a file name based on the naming conventions.
   * @param tableName - The table name to format.
   * @returns The formatted file name.
   */
  public getFileName(tableName: string): string {
    return StringHelper.formatName(StringHelper.getModeSingularize(tableName, this.getOptions().singularizeModel), this.getOptions().file);
  }

  /**
   * Formats a name into a property name based on the naming conventions.
   * @param name - The name to format.
   * @returns The formatted property name.
   */
  public getPropertyName(name: string): string {
    return StringHelper.formatName(name, this.getOptions().property);
  }
}
