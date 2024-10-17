import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private greeting: string;

  constructor() {
    this.greeting = 'Hello World!'; // Default greeting
  }

  // Method to get the greeting message
  getHello(): string {
    return this.greeting;
  }

  // Optional: Method to update the greeting message
  setGreeting(newGreeting: string): void {
    this.greeting = newGreeting;
  }
}
