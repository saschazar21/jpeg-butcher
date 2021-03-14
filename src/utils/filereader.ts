export const SUPPORTED_FILETYPES = ['image/jpeg'];

const fileReader = async (files: FileList): Promise<Uint8Array> =>
  new Promise((resolve, reject) => {
    if (!files?.length) {
      return reject(new Error('No files transmitted!'));
    }
    if (files.length > 1) {
      return reject(new Error('Only a single file is supported!'));
    }

    const [file] = files;

    if (SUPPORTED_FILETYPES.indexOf(file.type) < 0) {
      return reject(
        new Error(
          `Only the following file types are supported: ${SUPPORTED_FILETYPES.join(
            ', ',
          )}!`,
        ),
      );
    }

    const reader = new FileReader();

    reader.onerror = () => reject(reader.error);
    reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer));

    reader.readAsArrayBuffer(file);
  });

export default fileReader;
