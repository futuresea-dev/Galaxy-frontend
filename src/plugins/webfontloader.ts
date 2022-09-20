/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export async function loadFonts() {
  const webFontLoader = await import(/* webpackChunkName: "webfontloader" */ "webfontloader")

  webFontLoader.load({
    google: {
      api: "https://fonts.googleapis.com/css2",
      families: ["Open+Sans:wdth,wght@75,300;75,400;75,500;100,300;100,400;100,500;100,600;100,700&display=swap"],
    },
  })
}
