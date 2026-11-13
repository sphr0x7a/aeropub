function operator(proxies = [], targetPlatform, context) {
  // 從腳本操作參數讀取白名單關鍵字
  const allowedUAs = String($arguments.ua || '')
    .split(';')
    .map(x => x.trim())
    .filter(Boolean);

  // 獲取請求 UA
  const headers = $options?._req?.headers || {};

  const requestUA = String(
    Object.entries(headers)
      .find(([key]) => key.toLowerCase() === 'user-agent')?.[1] || ''
  ).trim();

  // 區分大小寫的關鍵字包含匹配
  const isAllowed = allowedUAs.some(keyword =>
    requestUA.includes(keyword)
  );

  // UA 不匹配白名單
  if (!isAllowed) {
    const deniedNode = {
      name: '訪問被拒絕',
      type: 'trojan',
      server: 'access.denied',
      port: 443,
      password: 'abc123',
      tfo: true,
      sni: 'www.bing.com',
      'skip-cert-verify': true
    };

    $options._res = {
      status: 404,
      headers: {
        'subscription-userinfo': null,
        'profile-web-page-url': null,
        'x-powered-by': 'Unknown'
      },
      body: ''
    };

    return [deniedNode];
  }

  // UA 合法，正常輸出原節點
  return proxies;
}