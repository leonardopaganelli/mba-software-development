export interface Document {
  event_id: string;
  label: string;
  description: string;
  created_at: string;
}

export interface Court {
  id: number;
  name: string;
  alias: string;
  city: string;
  state: string;
}

export interface Involved {
    perpetrator: string;
    acused: string;
    plaintifLawyer: Lawyer;
    defendantLawyer: Lawyer;
  };

export interface Lawyer {
    id: string;
    name: string;
}
export interface Subject {
    id: string;
    name: string;
}
export interface Event {
    date: string;
    documents: Document[];
}

export interface Lawsuit {
  id: string;
  nature: string;
  judicialBranch: string;
  initDate: Date;
  amountInControversy: number;
  Court: Court;
  Involved: Involved;
  subjects: Subject[];
  events: Event[];
}