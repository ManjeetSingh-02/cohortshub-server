// import external modules
import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

(async function () {
  const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../../');
  const apiFilesPatterns = ['src/api/v1/**/*.controllers.js'];
  const outputFile = path.join(rootDir, 'docs/apiDocs.json');

  try {
    // generate API documentation in OpenAPI 3.0 format using swagger-jsdoc
    const generatedAPIDocs = swaggerJsdoc({
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'ChaiHub-Server API Documentation',
          description: 'Interactive API reference for ChaiHub-Server',
          version: '1.0.0',
          contact: {
            name: 'Manjeet Singh',
            url: 'https://github.com/ManjeetSingh-02',
            email: 'manjeetsingh.wrk@gmail.com',
          },
        },
        servers: [
          {
            url: 'http://localhost:3000',
            description: 'Development Server',
          },
        ],
      },
      apis: apiFilesPatterns,
    });

    // save the generated documentation to a JSON file in the output directory
    await fs.writeFile(outputFile, JSON.stringify(generatedAPIDocs, null, 2), 'utf8');
    console.log('--- API Documentation JSON Stored in Output File: ✅');
  } catch (error) {
    // log error
    console.error('---------------------------------------------------------');
    console.error('ERROR DURING API DOCS JSON GENERATION');
    console.error(`ERROR DETAILS: ${error.message}`);
    console.error('RUN THE SCRIPT AGAIN AFTER FIXING THE ISSUE');
    console.error('---------------------------------------------------------');

    // delete the output file if it was partially created
    await fs.unlink(outputFile).catch(() => {});
    console.log('--- Partially Created Output File Deletion: ✅');

    // exit with failure
    process.exit(1);
  }
})();
