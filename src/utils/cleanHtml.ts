export const cleanHtml = (raw: string): string => {
  let html: string = raw;

  // Декодуємо основні entity
  html = html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

  // <font> -> <span>
  html = html.replace(/<font/gi, '<span').replace(/<\/font>/gi, '</span>');

  // Викидаємо blob-картинки (вони все одно не відобразяться)
  html = html.replace(/<img[^>]+src="blob:[^"]*"[^>]*>/gi, '');

  // Прибираємо style="..." в <img>, щоб ніякий width:0/height:0 не ламав нам розмір
  html = html.replace(/<img([^>]*?)\sstyle="[^"]*"(.*?)>/gi, '<img$1$2>');

  // Прибираємо width="0" / height="0" у <img>
  html = html.replace(
    /<img([^>]*?)\s(width|height)="0[^"]*"(.*?)>/gi,
    '<img$1$3>',
  );

  // Remove all <br> tags
  html = html.replace(/<br\s*\/?>/gi, '');

  // Remove empty paragraphs (including those with &nbsp;)
  html = html.replace(/<p[^>]*>(?:[\s\u00a0]|&nbsp;)*<\/p>/gi, '');

  // Remove newlines/tabs (replace with space to avoid merging words)
  html = html.replace(/[\r\n\t]+/g, ' ');

  return html;
};
