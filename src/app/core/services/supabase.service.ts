import { Injectable } from '@angular/core';
import {
  createClient,
  SupabaseClient
} from '@supabase/supabase-js';

import {
  environment
} from '../../../enviroments/environment';

/**
 * Provides the connection to the Supabase database.
 *
 * The service creates and exposes a single Supabase client
 * that can be reused by other services in the application.
 */
@Injectable({
  providedIn: 'root'
})
export class SupabaseConnectionService {

  /**
   * Supabase client used to communicate with the database.
   */
  private readonly connection: SupabaseClient;

  /**
   * Creates the Supabase client using the project
   * configuration from the environment.
   */
  constructor() {
    this.connection = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  /**
   * Returns the configured Supabase client.
   *
   * @returns The application's Supabase client.
   */
  getClient(): SupabaseClient {
    return this.connection;
  }
}