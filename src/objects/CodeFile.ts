/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import fs from 'node:fs';

import {diffChars} from 'diff';

// helpers
import FileHelper from '~/helpers/FileHelper';

// types
import type {GeneratorOptions} from '~/typings/generator';

/**
 * Represents a code file with a filename, content, and optional generation options.
 * Provides functionality to read, compare, and save code files with support for dry-run mode.
 */
export default class CodeFile {
  /**
   * Creates an instance of CodeFile.
   * @param filename - The name of the file.
   * @param content - The content of the file.
   * @param options - Optional generator settings.
   */
  constructor(protected readonly filename: string, protected readonly content: string, protected readonly options: GeneratorOptions = {}) {
  }

  /**
   * Reads the existing file content if it exists, otherwise returns the current content.
   * @returns The file content as a string.
   */
  public readExistingFile(): string {
    return fs.existsSync(this.filename)
      ? fs.readFileSync(this.filename, {encoding: 'utf-8'})
      : this.content;
  }

  /**
   * Draws a formatted table and displays the given text content.
   * @param text - The text content to display within the table.
   */
  public drawTable(text: string): void {
    const lines = text.split('\n');
    const maxLength = Math.max(...lines.map(line => line.length));
    const padding = 2;
    const totalWidth = maxLength + (padding * 2);

    // Top border
    console.log('┌' + '─'.repeat(totalWidth) + '┐');

    // Content lines
    lines.forEach(line => {
      const paddedLine = line.padEnd(maxLength, ' ');
      console.log('│' + ' '.repeat(padding) + paddedLine + ' '.repeat(padding) + '│');
    });

    // Bottom border
    console.log('└' + '─'.repeat(totalWidth) + '┘');
  }

  /**
   * Displays a character-by-character diff between the existing file and current content.
   * Uses color coding to highlight additions (green) and deletions (red).
   * Outputs the diff to the console with a formatted header showing the filename.
   */
  public diff(): void {
    const changes = diffChars(this.readExistingFile(), this.content);

    this.drawTable('File: ' + this.filename);

    let output = '';
    changes.forEach(part => {
      // Use ANSI escape codes for colors
      let colorCode = '';
      if (part.added) {
        colorCode = '\x1b[32m'; // Green for additions
      } else if (part.removed) {
        colorCode = '\x1b[31m'; // Red for deletions
      } else {
        colorCode = '\x1b[39m'; // Default color for common parts
      }

      output += colorCode + part.value;
    });

    // Add reset code and log the complete output
    console.log(output + '\x1b[0m');
  }

  /**
   * Saves the file to disk or displays a diff if dry-run mode is enabled.
   * In dry-run mode, it calls the diff() method instead of saving.
   */
  public save(): void {
    if (this.options?.dryRun) {
      this.diff();
      return;
    }

    FileHelper.saveTextToFile(this.filename, this.content);
  }
}
