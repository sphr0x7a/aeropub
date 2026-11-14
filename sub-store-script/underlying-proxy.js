const rules = Object.keys($arguments || {})
  .filter(key => /^\d+$/.test(key))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

for (const key of rules) {
  const value = $arguments[key];
  if (typeof value !== 'string') continue;

  const match = value.match(/^\/([\s\S]+)\/,(.*)$/);
  if (!match) continue;

  try {
    const regex = new RegExp(match[1]);

    if (regex.test($server.name)) {
      $server['underlying-proxy'] = match[2];
    }
  } catch (e) {
    console.log(`规则 ${key} 正则表达式无效：${e}`);
  }
}
