import { SetStorage } from '@/data/protocols/cache/set-storage';
import { GetStorage } from '@/data/protocols/cache/get-storage';

export class LocalStorageAdapter implements SetStorage, GetStorage {
  get(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
