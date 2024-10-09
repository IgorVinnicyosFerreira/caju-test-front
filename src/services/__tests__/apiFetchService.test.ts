import APIFetch from '../apiFetchService';

global.fetch = jest.fn(() => Promise.resolve({ ok: true } as Response));

const MOCK_URL = 'https://caju.testing.com/test';

describe('APIFetch', () => {
  let apiFetch: APIFetch;

  beforeEach(() => {
    apiFetch = new APIFetch();
    jest.clearAllMocks();
  });

  it('should call GET request fetch with the correct URL and config', async () => {
    const config = { headers: { 'Content-Type': 'application/json' } };

    await apiFetch.get(MOCK_URL, config);

    expect(fetch).toHaveBeenCalledWith(MOCK_URL, config);
  });

  it('should call POST request fetch with the correct URL and POST method', async () => {
    const config = { body: JSON.stringify({ data: 'test' }) };

    await apiFetch.post(MOCK_URL, config);

    expect(fetch).toHaveBeenCalledWith(MOCK_URL, {
      method: 'POST',
      ...config,
    });
  });

  it('should call PATCH request fetch with the correct URL and PATCH method', async () => {
    const config = { body: JSON.stringify({ data: 'test' }) };

    await apiFetch.patch(MOCK_URL, config);

    expect(fetch).toHaveBeenCalledWith(MOCK_URL, {
      method: 'PATCH',
      ...config,
    });
  });

  it('should call PUT request fetch with the correct URL and PUT method', async () => {
    const config = { body: JSON.stringify({ data: 'test' }) };

    await apiFetch.put(MOCK_URL, config);

    expect(fetch).toHaveBeenCalledWith(MOCK_URL, {
      method: 'PUT',
      ...config,
    });
  });

  it('should call DELETE fetch request with the correct URL and DELETE method', async () => {
    const config = { headers: { 'Authorization': 'Bearer token' } };

    await apiFetch.delete(MOCK_URL, config);

    expect(fetch).toHaveBeenCalledWith(MOCK_URL, {
      method: 'DELETE',
      ...config,
    });
  });

  it('should call fetch without config when no config is provided', async () => {
    await apiFetch.get(MOCK_URL);
    await apiFetch.post(MOCK_URL);
    await apiFetch.patch(MOCK_URL);
    await apiFetch.put(MOCK_URL);
    await apiFetch.delete(MOCK_URL);

    expect(fetch).toHaveBeenNthCalledWith(1,  MOCK_URL, undefined);
    expect(fetch).toHaveBeenNthCalledWith(2,  MOCK_URL, { method: 'POST' });
    expect(fetch).toHaveBeenNthCalledWith(3,  MOCK_URL, { method: 'PATCH' });
    expect(fetch).toHaveBeenNthCalledWith(4,  MOCK_URL, { method: 'PUT' });
    expect(fetch).toHaveBeenNthCalledWith(5,  MOCK_URL, { method: 'DELETE' });
  });
});
