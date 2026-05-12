import fs from 'fs';
import path from 'path';

export default {
  async getDocumentation(ctx) {
    const { version, slug } = ctx.params;

    try {
      const docPath = path.join(
        strapi.dirs.app.src,
        'extensions',
        'documentation',
        'documentation',
        version,
        `${slug}.json`
      );

      if (!fs.existsSync(docPath)) {
        return ctx.notFound({ message: 'Documentation file not found' });
      }

      const documentation = JSON.parse(fs.readFileSync(docPath, 'utf-8'));
      return ctx.send(documentation);
    } catch (error) {
      strapi.log.error('Error reading documentation file:', error);
      return ctx.internalServerError({ message: 'Failed to read documentation' });
    }
  },
};
