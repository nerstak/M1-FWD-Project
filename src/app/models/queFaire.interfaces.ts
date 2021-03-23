/**
 * Interfaces used to interact with responses from the queFaire API
 * This is not an exhaustive mapping of API's responses: we don't need every information
 */

/**
 * Root element of responses
 */
export interface QueFaire$Response {
  nhits: number,
  parameters: {rows: number},
  records: Record[]
}

/**
 * Record corresponds to one and every event
 */
export interface Record {
  recordId: string,
  fields: Fields,
  geometry: {
    coordinates: [
      lon: number,
      lat: number
    ]}
}

/**
 * Fields of a record
 */
interface Fields {
  blind: boolean,
  pmr: boolean,
  deaf: boolean,
  date_end: Date,
  access_type: string,
  occurrences: Date,
  address_street: string,
  category: string,
  title: string,
  description: string,
  tags: string,
  cover_url: string,
  cover_alt: string,
  address_city: string,
  price_type: string,
  date_description: string
}
