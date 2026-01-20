import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({ providedIn: 'root' })
export class UserApi {

  constructor(private api: ApiService) {}

  // get user profile detail
  getProfile() {
    return this.api.get<{ success: boolean; message: string; data: any }>('/users/profile');
  }

}
