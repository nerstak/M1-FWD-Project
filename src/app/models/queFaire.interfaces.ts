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
        {
          lon: number,
          lat: number
        }
    ]}
}

/**
 * Fields of a record
 */
export default interface Fields {
  blind: boolean,
  pmr: boolean,
  deaf: boolean,
  date_end: Date,
  date_start: Date,
  access_type: string,
  occurrences: string,
  address_street: string,
  category: string,
  title: string,
  description: string,
  tags: string,
  cover_url: string,
  cover_alt: string,
  address_city: string,
  date_description: string,
  address_zipcode: string,
  price_type: string
}

export interface QueFaire$Request {
  deaf?: boolean,
  blind?: boolean,
  pmr?: boolean,
  q?: string,
  category?: string,
  price_type?: string,
  access_type?: string,
  address_city?: string,
  address_zipcode?: string,
  date?: Date,
  tags?: string[]
}
