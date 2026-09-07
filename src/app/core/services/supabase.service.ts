import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../enviroments/environment';

/**
 * Provides the connection to the Supabase database.
 */
@Injectable({
  providedIn: 'root'
})
export class SupabaseConnectionService {
  private readonly connection: SupabaseClient;

  /**
   * Creates the Supabase client with the project configuration.
   */
  constructor() {
    this.connection = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  /**
   * Returns the Supabase client.
   *
   * @returns The connected Supabase client.
   */
  getClient(): SupabaseClient {
    return this.connection;
  }
}