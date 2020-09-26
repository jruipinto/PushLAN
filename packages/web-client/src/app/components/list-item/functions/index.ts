import { createWriteStream } from 'streamsaver';

declare global {
  interface Window {
    writer: any;
  }
}

export const downloadFile = (url, fileName) => {
  const fileStream = createWriteStream(fileName);
  return fetch(url).then(res => {
    const readableStream = res.body;

    // more optimized
    if (window.WritableStream && readableStream.pipeTo) {
      return readableStream.pipeTo(fileStream);
    }

    window.writer = fileStream.getWriter();

    const reader = res.body.getReader();
    const pump = () => reader.read()
      .then(e => e.done
        ? window.writer.close()
        : window.writer.write(e.value).then(pump));

    return pump();
  });
};
