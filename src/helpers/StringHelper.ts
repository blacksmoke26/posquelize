/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import pluralize, {singular} from 'pluralize';
import {camelCase, kebabCase, noCase, pascalCase, snakeCase} from 'change-case';

// types
import type {CaseType, FileCaseType, SingularizeModel} from '~/typings/generator';

/**
 * Utility class for string transformations commonly used in database naming conventions.
 */
export default abstract class StringHelper {
  /**
   * Converts a string to lowercase with spaces between words.
   *
   * @param name - The string to normalize
   * @returns The normalized string
   *
   * @example
   * ```typescript
   * StringHelper.normalize('UserName') // returns 'user name'
   * StringHelper.normalize('table_name') // returns 'table name'
   * ```
   */
  public static normalize(name: string): string {
    return noCase(name);
  }

  /**
   * Normalizes a string and converts it to its singular form.
   *
   * @param name - The string to normalize and singularize
   * @returns The normalized singular string
   *
   * @example
   * ```typescript
   * StringHelper.normalizeSingular('Users') // returns 'user'
   * StringHelper.normalizeSingular('BlogPosts') // returns 'blog post'
   * ```
   */
  public static normalizeSingular(name: string): string {
    return singular(noCase(name));
  }

  /**
   * Converts a table name to a model name in PascalCase.
   *
   * @param table - The table name to convert
   * @returns The model name in PascalCase
   *
   * @example
   * ```typescript
   * StringHelper.tableToModel('users') // returns 'User'
   * StringHelper.tableToModel('blog_posts') // returns 'BlogPost'
   * StringHelper.tableToModel('user_profiles') // returns 'UserProfile'
   * ```
   */
  public static tableToModel(table: string): string {
    return pascalCase(singular(table));
  }

  /**
   * Converts a column name to a property name in camelCase.
   *
   * @param column - The column name to convert
   * @returns The property name in camelCase
   *
   * @example
   * ```typescript
   * StringHelper.toPropertyName('first_name') // returns 'firstName'
   * StringHelper.toPropertyName('user_id') // returns 'userId'
   * StringHelper.toPropertyName('created_at') // returns 'createdAt'
   * ```
   */
  public static toPropertyName(column: string): string {
    return camelCase(column);
  }

  /**
   * Removes '_id' or 'Id' suffix from a column name.
   *
   * @param columnName - The column name to process
   * @param pascalize - Whether to convert the result to PascalCase (default: false)
   * @returns The column name without ID suffix, optionally in PascalCase
   *
   * @example
   * ```typescript
   * StringHelper.omitId('user_id') // returns 'user'
   * StringHelper.omitId('postId') // returns 'post'
   * StringHelper.omitId('user_id', true) // returns 'User'
   * StringHelper.omitId('postId', true) // returns 'Post'
   * ```
   */
  public static omitId(columnName: string, pascalize: boolean = false) {
    const column = String(columnName || '').replace(/_id|Id/g, '');
    return pascalize ? pascalCase(column) : column;
  }

  /**
   * Converts a table name and column name to a configurable enum name in PascalCase.
   *
   * @param tableName - The table name to convert
   * @param columnName - The column name to convert
   * @returns The configurable enum name in PascalCase
   *
   * @example
   * ```typescript
   * StringHelper.toConfigurableEnumName('users', 'roles') // returns 'UserRole'
   * StringHelper.toConfigurableEnumName('blog_posts', 'categories') // returns 'BlogPostCategory'
   * ```
   */
  public static toConfigurableEnumName(tableName: string, columnName: string): string {
    return pascalCase(singular(tableName) + '_' + singular(columnName));
  }

  /**
   * Returns the singular or plural form of a name based on the specified type.
   *
   * @param name - The string to singularize or pluralize
   * @param type - The type of transformation ('singular', 'plural', or undefined)
   * @returns The transformed string in singular or plural form, or the original name if type is undefined
   *
   * @example
   * ```typescript
   * StringHelper.getModeSingularize('users', 'singular') // returns 'user'
   * StringHelper.getModeSingularize('user', 'plural') // returns 'users'
   * StringHelper.getModeSingularize('user', undefined) // returns 'user'
   * ```
   */
  public static getModeSingularize(name: string, type: SingularizeModel | undefined): string {
    switch (type) {
      case 'singular':
        return singular(name);
      case 'plural':
        return pluralize(name);
      default:
        return name;
    }
  }

  /**
   * Formats a string according to the specified case type.
   *
   * @param name - The string to format
   * @param caseType - The case type to apply ('camel', 'lower_snake', 'pascal', 'upper_snake', 'kebab', or undefined)
   * @returns The formatted string in the specified case, or the original name if caseType is undefined
   *
   * @example
   * ```typescript
   * StringHelper.formatName('userName', 'camel') // returns 'userName'
   * StringHelper.formatName('userName', 'lower_snake') // returns 'user_name'
   * StringHelper.formatName('userName', 'pascal') // returns 'UserName'
   * StringHelper.formatName('userName', 'upper_snake') // returns 'USER_NAME'
   * StringHelper.formatName('userName', 'kebab') // returns 'user-name'
   * StringHelper.formatName('userName', undefined) // returns 'userName'
   * ```
   */
  public static formatName(name: string, caseType: FileCaseType | CaseType | undefined): string {
    switch (caseType) {
      case 'camel':
        return camelCase(name);
      case 'lower_snake':
        return snakeCase(name);
      case 'pascal':
        return pascalCase(name);
      case 'upper_snake':
        return snakeCase(name).toUpperCase();
      case 'kebab':
        return kebabCase(name);
      default:
        return name;
    }
  }
}
