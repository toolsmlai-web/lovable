export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          created_at: string;
          updated_at: string;
          user_id: string;
          settings: Json;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
          user_id: string;
          settings?: Json;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
          settings?: Json;
        };
      };
      project_files: {
        Row: {
          id: string;
          project_id: string;
          name: string;
          path: string;
          content: string;
          language: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          name: string;
          path: string;
          content: string;
          language: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          name?: string;
          path?: string;
          content?: string;
          language?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          project_id: string;
          role: string;
          content: string;
          created_at: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          role: string;
          content: string;
          created_at?: string;
          user_id: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          role?: string;
          content?: string;
          created_at?: string;
          user_id?: string;
        };
      };
    };
  };
}

type Json = Record<string, any>;
