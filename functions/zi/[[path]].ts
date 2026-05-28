export async function onRequest(context: { request: Request }): Promise<Response> {
  const url = new URL(context.request.url)
  const path = url.pathname.replace('/zi/', '')
  const target = `http://zu.zi.tools/${path}`
  const resp = await fetch(target)
  const headers = new Headers(resp.headers)
  headers.delete('content-encoding')
  headers.delete('content-length')
  return new Response(resp.body, {
    status: resp.status,
    headers,
  })
}
