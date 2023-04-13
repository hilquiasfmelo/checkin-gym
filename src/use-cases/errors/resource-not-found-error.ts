export class ResourceNotFoundError extends Error {
  constructor() {
    super('User not found.')
  }
}
