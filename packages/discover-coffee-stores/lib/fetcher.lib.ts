const fetcher = <T>(...args: Parameters<typeof fetch>): Promise<T> =>
  fetch(...args)
    .then((res) => res.json())
    .then(({ data }) => data as T)

export default fetcher
