import { Pipe, PipeTransform, signal } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';
import { map, Observable } from 'rxjs';

/**
 * Displays a human-readable text for the given user.
 */
@Pipe({
  name: 'user',
})
export class UserPipe implements PipeTransform {

  user = signal(undefined);

  constructor(
    private userService: UserService,
  ) {
  }

  transform(userId: number): Observable<string> {
      return this.userService.getUserDetails(userId).pipe(
        map(user => this.userToString(user)),
      );
  }

  private userToString(user: number | User): string {
    return typeof user === 'number' ? `User #${user}` : `${user.firstName} ${user.lastName}`;
  }
}
