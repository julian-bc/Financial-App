export const idTypes = {
    CIUDADANIA_CEDULA: "CIUDADANIA_CEDULA",
    EXTRANJERIA_CEDULA: "EXTRANJERIA_CEDULA",
    PASAPORTE: "PASAPORTE",
    PEP: "PEP"
} as const;

export interface ClientRequest {
  idType: typeof idTypes;
  idNum: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  emailAddress: string; 
}

export interface ClientResponse extends ClientRequest {
  createdAt: Date;
  updatedAt: Date;
}