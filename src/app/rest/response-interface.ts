/*
 * Interface for casting the returned json data to
 * 
 */
export interface ThingSpeakData {
  channel: {
    id: 500326,
    name: string;
    latitude: string;
    longitude: string;
    field1: string;
    field2: string;
    field3: string;
    field4: string;
    field5: string;
    field6: string;
    field7: string;
    created_at: string;
    updated_at: string;
    last_entry_id: number;
  };
  feeds: Feeds[];
}

class Feeds {
  created_at: string;
  entry_id: number;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  field7: string;
}