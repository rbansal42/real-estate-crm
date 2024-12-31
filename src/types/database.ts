export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Role = 'admin' | 'user'
export type TeamRole = 'admin' | 'member'
export type PropertyType = 'apartment' | 'house' | 'land' | 'commercial'
export type PropertyStatus = 'available' | 'sold' | 'rented' | 'pending'
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed' | 'lost'
export type LeadSource = 'website' | 'referral' | 'magicbricks' | '99acres' | 'direct' | 'other'
export type InteractionType = 'call' | 'email' | 'meeting' | 'site_visit' | 'follow_up' | 'other'
export type PropertyInterestStatus = 'interested' | 'viewed' | 'offer_made' | 'negotiating' | 'purchased' | 'rejected'

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          role: Role
          permissions: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          role?: Role
          permissions?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          role?: Role
          permissions?: string[]
          updated_at?: string
        }
      }
      teams: {
        Row: {
          id: string
          name: string
          description: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          description?: string | null
          updated_at?: string
        }
      }
      team_members: {
        Row: {
          id: string
          team_id: string
          user_id: string
          role: TeamRole
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          team_id: string
          user_id: string
          role?: TeamRole
          created_at?: string
          updated_at?: string
        }
        Update: {
          role?: TeamRole
          updated_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          title: string
          description: string | null
          type: PropertyType
          status: PropertyStatus
          price: number
          area: number
          bedrooms: number | null
          bathrooms: number | null
          location: Json
          amenities: string[]
          images: string[]
          team_id: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          type: PropertyType
          status: PropertyStatus
          price: number
          area: number
          bedrooms?: number | null
          bathrooms?: number | null
          location: Json
          amenities?: string[]
          images?: string[]
          team_id?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string | null
          type?: PropertyType
          status?: PropertyStatus
          price?: number
          area?: number
          bedrooms?: number | null
          bathrooms?: number | null
          location?: Json
          amenities?: string[]
          images?: string[]
          team_id?: string | null
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          name: string
          email: string | null
          phone: string | null
          source: LeadSource
          status: LeadStatus
          requirements: Json
          notes: string | null
          assigned_to: string | null
          team_id: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          phone?: string | null
          source: LeadSource
          status: LeadStatus
          requirements?: Json
          notes?: string | null
          assigned_to?: string | null
          team_id?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          email?: string | null
          phone?: string | null
          source?: LeadSource
          status?: LeadStatus
          requirements?: Json
          notes?: string | null
          assigned_to?: string | null
          team_id?: string | null
          updated_at?: string
        }
      }
      lead_interactions: {
        Row: {
          id: string
          lead_id: string
          type: InteractionType
          notes: string | null
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          lead_id: string
          type: InteractionType
          notes?: string | null
          created_by?: string | null
          created_at?: string
        }
        Update: {
          type?: InteractionType
          notes?: string | null
        }
      }
      lead_property_interests: {
        Row: {
          id: string
          lead_id: string
          property_id: string
          status: PropertyInterestStatus
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          lead_id: string
          property_id: string
          status: PropertyInterestStatus
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          status?: PropertyInterestStatus
          notes?: string | null
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 