export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          Age: number | null
          applicant_id: string
          applied_at: string
          Contact: number | null
          email: string | null
          "First name": string | null
          id: string
          "Last Name": string | null
          opportunity_id: string
          Portfolio: Database["public"]["Enums"]["Portfolio_type"]
          "Religious Qualification": string | null
          resume_url: string | null
          "Secular Qualification": string | null
          Skills: string | null
          status: string
        }
        Insert: {
          Age?: number | null
          applicant_id: string
          applied_at?: string
          Contact?: number | null
          email?: string | null
          "First name"?: string | null
          id?: string
          "Last Name"?: string | null
          opportunity_id: string
          Portfolio?: Database["public"]["Enums"]["Portfolio_type"]
          "Religious Qualification"?: string | null
          resume_url?: string | null
          "Secular Qualification"?: string | null
          Skills?: string | null
          status?: string
        }
        Update: {
          Age?: number | null
          applicant_id?: string
          applied_at?: string
          Contact?: number | null
          email?: string | null
          "First name"?: string | null
          id?: string
          "Last Name"?: string | null
          opportunity_id?: string
          Portfolio?: Database["public"]["Enums"]["Portfolio_type"]
          "Religious Qualification"?: string | null
          resume_url?: string | null
          "Secular Qualification"?: string | null
          Skills?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          end_time: string
          event_date: string
          id: string
          image_urls: string[] | null
          start_time: string
          title: string
          updated_at: string
          venue: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          end_time: string
          event_date: string
          id?: string
          image_urls?: string[] | null
          start_time: string
          title: string
          updated_at?: string
          venue: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          end_time?: string
          event_date?: string
          id?: string
          image_urls?: string[] | null
          start_time?: string
          title?: string
          updated_at?: string
          venue?: string
        }
        Relationships: []
      }
      opportunities: {
        Row: {
          created_at: string
          created_by: string
          description: string
          duration: string
          id: string
          is_active: boolean
          job_title: string
          portfolio: Database["public"]["Enums"]["Portfolio_type"]
          skill_requirement: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description: string
          duration: string
          id?: string
          is_active?: boolean
          job_title: string
          portfolio: Database["public"]["Enums"]["Portfolio_type"]
          skill_requirement: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string
          duration?: string
          id?: string
          is_active?: boolean
          job_title?: string
          portfolio?: Database["public"]["Enums"]["Portfolio_type"]
          skill_requirement?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          portfolio: Database["public"]["Enums"]["Portfolio_type"] | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id: string
          portfolio?: Database["public"]["Enums"]["Portfolio_type"] | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          portfolio?: Database["public"]["Enums"]["Portfolio_type"] | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      todos: {
        Row: {
          completed: boolean
          content: string
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          content: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          content?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      Portfolio_type:
  | "Office Bearers"
  | "Finance"
  | "MIS and Access"
  | "RECCU"
  | "REDU"
  | "Waez Unit"
  | "IREU"
  | "Academics"
  | "Youth"
  | "Jamati Affairs"
  | "Communications"
  | "MNE"
  | "HRE"
  | "PEDU"
  | "HR"
  | "Library and ICT"
  | "Access"
  | "ECD"
  | "Distance Learning"
  | "STEP"
  | "PSU"
  | "SFC"
  | "Quran"
  | "Special HRE"

      user_role: "board_member" | "applicant"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      Portfolio_type: [
  "Office Bearers",
  "Finance",
  "MIS and Access",
  "RECCU",
  "REDU",
  "Waez Unit",
  "IREU",
  "Academics",
  "Youth",
  "Jamati Affairs",
  "Communications",
  "MNE",
  "HRE",
  "PEDU",
  "HR",
  "Library and ICT",
  "Access",
  "ECD",
  "Distance Learning",
  "STEP",
  "PSU",
  "SFC",
  "Quran",
  "Special HRE"
],

      user_role: ["board_member", "applicant"],
    },
  },
} as const
