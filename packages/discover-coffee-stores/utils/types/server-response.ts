export default class ServerResponse<T> extends Error {
  constructor(
    public data: T,
    public message: string,
    public statusCode: number,
  ) {
    super(message);

    this.statusCode = statusCode
    this.data = data
  }
}