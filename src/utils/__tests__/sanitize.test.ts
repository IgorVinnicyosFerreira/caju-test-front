import sanitize from '../sanitize';

describe('sanitize', () => {
  it('should escape HTML special characters', () => {
    const input = '<div>Hello "World" & Friends\'s</div>';
    const expected = '&lt;div&gt;Hello &quot;World&quot; &amp; Friends&#039;s&lt;/div&gt;';
    
    const result = sanitize(input);
    
    expect(result).toBe(expected);
  });

  it('should remove angle brackets', () => {
    const input = '<script>alert("XSS")</script>';
    const expected = '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;';
    
    const result = sanitize(input);
    
    expect(result).toBe(expected);
  });

  it('should trim whitespace from the start and end', () => {
    const input = '   Hello World!   ';
    const expected = 'Hello World!';
    
    const result = sanitize(input);
    
    expect(result).toBe(expected);
  });

  it('should reduce multiple spaces to a single space', () => {
    const input = 'Hello     World!';
    const expected = 'Hello World!';
    
    const result = sanitize(input);
    
    expect(result).toBe(expected);
  });

  it('should return an empty string when input is empty', () => {
    const input = '';
    const expected = '';
    
    const result = sanitize(input);
    
    expect(result).toBe(expected);
  });

  it('should sanitize a complex input', () => {
    const input = '   <b>Hello</b> & "World"\'s   <i>Friends</i>!   ';
    const expected = '&lt;b&gt;Hello&lt;/b&gt; &amp; &quot;World&quot;&#039;s &lt;i&gt;Friends&lt;/i&gt;!';
    
    const result = sanitize(input);
    
    expect(result).toBe(expected);
  });
});
