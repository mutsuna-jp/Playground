import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const playgroundsPath = path.resolve(__dirname, '../src/lib/playgrounds.json');
const vercelConfigPath = path.resolve(__dirname, '../vercel.json');

async function updateVercelConfig() {
    try {
        // Read playgrounds data
        const playgroundsRaw = fs.readFileSync(playgroundsPath, 'utf-8');
        const playgrounds = JSON.parse(playgroundsRaw);

        // Read existing vercel.json or create default
        let vercelConfig = {};
        if (fs.existsSync(vercelConfigPath)) {
            const vercelConfigRaw = fs.readFileSync(vercelConfigPath, 'utf-8');
            vercelConfig = JSON.parse(vercelConfigRaw);
        }

        // Generate rewrites
        const rewrites = [];

        for (const item of playgrounds) {
            if (item.destination && item.path.startsWith('/')) {
                const sourcePath = item.path;
                const destPath = item.destination;

                // Exact match
                rewrites.push({
                    source: sourcePath,
                    destination: destPath
                });

                // Trailing slash
                rewrites.push({
                    source: `${sourcePath}/`,
                    destination: `${destPath}/`
                });

                // Subpaths
                rewrites.push({
                    source: `${sourcePath}/:match*`,
                    destination: `${destPath}/:match*`
                });
            }
        }

        // Update rewrites in config
        // We only update if we have new rewrites, but we should probably preserve existing ones if they are not related to our playgrounds?
        // For now, let's assume we own the rewrites section or we just overwrite it with our playground rules.
        // The user requested "One file to change it all", so overwriting generated rules is likely expected.
        // However, to be safe, we could mark them or just overwrite.
        // Given the context ("Rewritesを使って各ページは別のプロジェクトとして実装します"), let's overwrite for simplicity 
        // BUT maintain any previous non-conflicting structure if possible... actually just overwriting 'rewrites' is safest for consistency with the JSON source.

        // Check if we accidentally empty it (though empty is valid if no playgrounds have destinations)
        vercelConfig.rewrites = rewrites;

        // Write back to vercel.json
        fs.writeFileSync(vercelConfigPath, JSON.stringify(vercelConfig, null, 4));

        console.log(`Updated vercel.json with ${rewrites.length} rewrite rules.`);

    } catch (error) {
        console.error('Error updating vercel.json:', error);
        process.exit(1);
    }
}

updateVercelConfig();
