import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const isProd = process.env.NODE_ENV === 'production';

const styleSrc = "style-src 'self' 'unsafe-inline'";

const scriptSrc = isProd
  ? "script-src 'self' 'unsafe-inline'"
  : "script-src 'self' 'unsafe-inline' 'unsafe-eval'";

// CSP v0: достаточно строгий, но без ломания.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  // Скрипты/стили
  scriptSrc,
  styleSrc,
  // Картинки: разрешаю self + Cloudinary + data: (нужно для inline/placeholder/иконок)
  "img-src 'self' https://res.cloudinary.com data: blob:",
  // Шрифты: если только локальные - оставляю self
  "font-src 'self' data:",
  // XHR/fetch: если формы отправляются на тот же домен/апи - достаточно self
  "connect-src 'self'",
  // next/image с оптимизацией через Vercel
  "media-src 'self'",
  ...(isProd ? ['upgrade-insecure-requests'] : []),
].join('; ');

const securityHeaders: { key: string; value: string }[] = [
  // Базовые
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Рекомендуется включать, даже если нет авторизации
  { key: 'X-Frame-Options', value: 'DENY' }, // дублирует frame-ancestors, но полезно для старых UA
  // Permissions-Policy: отключаю всё лишнее
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
  // Cross-origin политики - мягкий старт (без ломания)
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },

  // HSTS: включаю только в проде
  // (Если есть поддомены, которые НЕ на https - НЕ ставить includeSubDomains/preload)
  ...(isProd
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000',
        },
      ]
    : []),

  { key: 'Content-Security-Policy', value: csp },
];

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Отключаю streaming metadata,
  // чтобы metadata всегда рендерилась в <head>, и не могла попадать в <body>.
  htmlLimitedBots: /.*/,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', port: '' },
    ],
    deviceSizes: [320, 560, 768, 1280, 1440, 1920],
    imageSizes: [
      10, 12, 24, 64, 96, 128, 256, 384, 560, 780, 1024, 1280, 1440, 1920,
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 31,
    contentDispositionType: 'inline',
  },
};

const withNextIntl = createNextIntlPlugin('./src/shared/lib/i18n/request.ts');
export default withNextIntl(nextConfig);
