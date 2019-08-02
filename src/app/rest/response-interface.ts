export interface ThingSpeakData {
  channel: {
    id: number,
    name: string,
    latitude: string,
    longitude: string,
    field1: string,
    field3: string,
    field4: string,
    created_at: string,
    updated_at: string,
    last_entry_id: number,
  },
  feeds: [
    {
      created_at: string,
      entry_id: number,
      field1: string,
      field3: string,
      field4: string,
    }
  ]
}