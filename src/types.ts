export interface FactSheetData {
  person_name: string;
  primary_connections: string[];
  education: string[];
  key_memberships_awards: string[];
  ten_things_to_know: string[];
}

export interface GroundingSource {
  web: {
    uri: string;
    title: string;
  };
}
