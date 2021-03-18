export const SUPPORTED_FILETYPES = ['image/jpeg'];

const fileReader = async (files: FileList): Promise<[Uint8Array, string]> =>
  new Promise((resolve, reject) => {
    if (!files?.length) {
      return reject(new Error('No files transmitted!'));
    }
    if (files.length > 1) {
      return reject(new Error('Only a single file is supported!'));
    }

    const file = files[0];

    if (SUPPORTED_FILETYPES.indexOf(file.type) < 0) {
      return reject(
        new Error(
          `Only the following file types are supported: ${SUPPORTED_FILETYPES.join(
            ', ',
          )}!`,
        ),
      );
    }

    const worker = new Worker(
      new URL('../worker/strip-exif.js', import.meta.url),
      {
        name: 'strip-exif-worker',
        type: import.meta.env.mode === 'development' ? 'module' : 'classic',
      },
    );

    worker.onmessage = ({ data }: MessageEvent<Uint8Array>) => {
      resolve([new Uint8Array(data as ArrayBuffer), file.name]);
      return worker.terminate();
    };

    const reader = new FileReader();

    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      worker.postMessage(reader.result as Uint8Array);
    };

    reader.readAsArrayBuffer(file);
  });

export default fileReader;
