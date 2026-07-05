// Webmaster verification codes.
// Replace the empty strings with the codes you get from each platform's dashboard.
// After updating, commit + push. The BaseLayout will inject the corresponding meta tags.
//
// How to get each code:
// - Google Search Console: https://search.google.com/search-console/ -> Add property -> URL prefix -> verify via "HTML tag" -> copy the content value
// - Bing Webmaster:       https://www.bing.com/webmasters -> Add site -> verify via "Meta tag" -> copy the content value
// - Baidu Webmaster:      https://ziyuan.baidu.com -> 添加网站 -> 验证方式选择 "HTML标签" -> copy the content value
// - Yandex Webmaster:     https://webmaster.yandex.com -> Add site -> verify via "Meta tag" -> copy the content value
export const VERIFICATION = {
  google: '',  // e.g. 'abc123def456ghi789'
  bing:   '',  // e.g. '1234567890ABCDEF1234567890ABCDEF'
  baidu:  '',  // e.g. 'xxxxxxx'
  yandex: '',  // e.g. '12345abcde'
} as const;