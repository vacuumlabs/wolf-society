/** @type import("next").I18NConfig */
const i18n = {
    defaultLocale: 'en',
    locales: ['en', 'sk'],
    localeDetection: true,
};

/** @type import("next-i18next").UserConfig */
const nextI18NextConfig = {
  i18n,
  localePath: typeof window === 'undefined'
  ? require('path').resolve('./public/locales')
  : './public/locales'
}

module.exports = nextI18NextConfig;
