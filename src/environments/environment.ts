// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  basePath:
  "https://us-central1-sistema-rovianda.cloudfunctions.net/app/rovianda",//"http://localhost:5001/sistema-rovianda/us-central1/app/rovianda",//
  basePathMock: "https://2c94f13e-22f8-4cfc-80cb-1a54b163bd72.mock.pstmn.io",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
