// Global Rest Headers.
export default function(globalSettings, globalLang) {
  let sHeaders = new Headers();
  sHeaders.append('Accept-Language', globalLang.languageCode);
  sHeaders.append('ApplicationType', '1');
  sHeaders.append('Accept', 'application/json');
  sHeaders.append('Content-Type', 'application/json;charset=UTF-8');
  if (globalSettings) { sHeaders.append('Authorization', globalSettings.authorizationToken); }
  if (globalSettings) { sHeaders.append('ConsumerId', globalSettings.consumerId); }
  if (globalSettings) { sHeaders.append('LocationId', globalSettings.locationId); }
  if (globalSettings) { sHeaders.append('LevelId', globalSettings.levelId); }
  if (globalSettings) { sHeaders.append('UserId', globalSettings.userId); }
  if (globalSettings) { sHeaders.append('ModuleId', globalSettings.moduleId); }

  return sHeaders;
}
