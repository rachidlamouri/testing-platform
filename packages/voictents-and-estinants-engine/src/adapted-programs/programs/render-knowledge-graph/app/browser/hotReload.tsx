/**
 * A rudimentary script that polls the dev server to see if the last-modified
 * header has changed
 */
const hotReload = (): void => {
  setTimeout(() => {
    (async (): Promise<void> => {
      const currentPath = window.location.pathname;
      const response = await fetch(currentPath, {
        method: 'HEAD',
        headers: { 'cache-control': 'no-cache' },
      });
      const lastModifiedHeader = response.headers.get('last-modified');
      const lastModified = new Date(lastModifiedHeader).toISOString();

      const previousLastModified = new Date(
        document.lastModified,
      ).toISOString();

      if (lastModified > previousLastModified) {
        // eslint-disable-next-line no-console
        console.log('Hot reload!');
        window.location.reload();
      }

      hotReload();
    })().catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Hot reload failed');

      // eslint-disable-next-line no-console
      console.error(error);
    });
  }, 500);
};

hotReload();
