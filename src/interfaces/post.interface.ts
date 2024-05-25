export interface PostI {
  _id: string,
  title: string,
  body: string,
  createdBy: string,
  status: string,
  latitude: string,
  longitude: string
}

export interface PostsByLocationI {
  latitude?: string,
  longitude?: string
}