// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    meli: 'https://api.mercadolibre.com/',
    weather: 'https://api.openweathermap.org/data/2.5/weather?q=',
    dolar: 'https://www.dolarsi.com/api/api.php?type=valoresprincipales',
  },
  myUrl: 'http://localhost:8080'
};


//buenos%20aires,AR&appid=45c01786a7c18126d3d88795cde0453b
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
