import {
  IResourceMethod, IResourceMethodObservable,
  IResourceMethodObservableStrict,
  Resource,
  ResourceAction,
  ResourceHandler,
  ResourceParams,
  ResourceRequestMethod
} from '@ngx-resource/core';
import {Injectable} from '@angular/core';
import {ICasa} from '../interfaces/icasa';

@Injectable()
@ResourceParams({
  // IResourceParams
  pathPrefix: 'https://www.dolarsi.com/api/api.php?type=valoresprincipales'
})
export class CasaService extends Resource {

  @ResourceAction({
    // IResourceAction
    method: ResourceRequestMethod.Get,
    path: ''
  })
  getCasa: IResourceMethodObservable<null , ICasa>; // will make an post request to /auth/login

}
