import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export const data = parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'products.csv')), {
    columns: true,
    skip_empty_lines: true
});