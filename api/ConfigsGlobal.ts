import fs from 'fs';
import path from 'path';

// Luôn từ root project
const configPath = path.resolve(process.cwd(), 'test_data/configs.json');
console.log('Looking for config at:', configPath);

const rawData = fs.readFileSync(configPath, 'utf-8');
const config = JSON.parse(rawData);
console.log('Exists?', fs.existsSync(configPath));

export const ConfigsGlobal = {
  AUTHOR: config.AUTHOR,
  BASE_URL: config.BASE_URL,
  USERNAME: config.USERNAME,
  PASSWORD: config.PASSWORD,
  TCS_TOTAL: 0,
  PASSED_TOTAL: 0,
  FAILED_TOTAL: 0,
  SKIPPED_TOTAL: 0,
} as const;
