import fs from 'fs';
import path from 'path';

export default class JsonHelper {

  /**
   * Update / overwrite JSON file with object
   * @param filePath path to json file
   * @param data object to write
   */
  static updateValueJsonFile(filePath: string, data: any): void {
    try {
      const dir = path.dirname(filePath);

      // ensure directory exists
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(
        filePath,
        JSON.stringify(data, null, 2), // pretty print
        'utf-8'
      );
    } catch (error: any) {
      throw new Error(`❌ Failed to write object to JSON file: ${error.message}`);
    }
  }
}
