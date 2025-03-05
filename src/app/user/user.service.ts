import { Injectable } from '@angular/core';
import { User } from './user.model';
import { CommonApi } from '../api/common.api';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userStore = new Map<number, BehaviorSubject<number | User>>();
  private isRefreshing = false;

  constructor(
    private commonApi: CommonApi,
  ) {
  }

  public getUserDetails(userId: number): Observable<number | User> {
      if (!this.userStore.has(userId)) {
        this.userStore.set(userId, new BehaviorSubject<number | User>(userId));
        this.refreshLocalStore();
      }
      return this.userStore.get(userId)!.asObservable();
  }

  private refreshLocalStore() {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.commonApi.fetchUsers().pipe(
        map(response => response.users),
      ).subscribe((users: User[]) => {
        users.forEach(user => {
          if (this.userStore.has(user.id)) {
            (this.userStore.get(user.id)!.next(user));
          } else {
            this.userStore.set(user.id, new BehaviorSubject<number | User>(user));
          }

        });
        this.isRefreshing = false;
      })
    }
  }
}
