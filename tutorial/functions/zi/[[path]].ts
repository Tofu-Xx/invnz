export async function onRequest(context: { request: Request }): Promise<Response> {
  const url = new URL(context.request.url)
  const path = url.pathname.replace('/zi/', '')
  const target = `http://zu.zi.tools/${path}`
  const resp = await fetch(target)
  return new Response(resp.body, {
    status: resp.status,
    headers: resp.headers,
  })
}
