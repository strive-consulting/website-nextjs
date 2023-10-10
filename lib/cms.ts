import { createClient } from '@/prismicio'

export async function getTestimonials(maxcount?: number) {
  const client = createClient()

  const testimonials = await client.getAllByType('testimonial', {
    orderings: [{ field: 'my.testimonial.order', direction: 'desc' }],
    limit: maxcount ? maxcount : undefined,
  })

  return testimonials
}
