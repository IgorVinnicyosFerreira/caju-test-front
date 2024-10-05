const escapeHtml = (input: string) => {
  return input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}

const sanitize = (input: string) => {
  let sanitized = escapeHtml(input);
  sanitized = sanitized.replace(/[<>]/g, '');
  sanitized = sanitized.trim().replace(/\s+/g, ' ');

  return sanitized;
}

export default sanitize;