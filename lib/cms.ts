import { createClient } from '@/prismicio'
import { notFound } from 'next/navigation'

export async function getTestimonials(maxcount?: number) {
  const client = createClient()

  const testimonials = await client.getAllByType('testimonial', {
    orderings: [{ field: 'my.testimonial.order', direction: 'desc' }],
    limit: maxcount ? maxcount : undefined,
  })

  return testimonials
}

//Note, servicepage is the name of our general cms page
export async function getCmsPage(uid: string) {
  const client = createClient()
  const page = await client.getByUID('servicepage', uid).catch(() => notFound())

  return page
}

export async function getAllCmsPages() {
  const client = createClient()
  const pages = await client.getAllByType('servicepage')

  return pages
}

export async function getGlobalNav() {
  const client = createClient()
  const nav = await client.getSingle('global_nav')

  return nav
}

export async function getFooter() {
  const client = createClient()
  const footer = await client.getSingle('footer')

  return footer
}