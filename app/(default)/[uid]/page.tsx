import { SliceZone } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  // const heroBullets: string[] = [
  //   'Ideal in early stages',
  //   'Corporate tax exemptions',
  //   'Can be opened remotely',
  //   '100% foreign ownership (no local sponsor required)',
  // ]

  // const blocks: GridBlock[] = [
  //   {
  //     icon: Icons.Star,
  //     title: '100% Foreign Ownership',
  //     description:
  //       'One of the most appealing benefits of establishing a business in a free zone is full ownership rights. You can enjoy 100% ownership without help from sponsors, which means you have more control and are less at risk for any potential challenges or setbacks that might come up down the line.',
  //   },
  //   {
  //     icon: Icons.List,
  //     title: 'Corporate And Personal Tax Exemptions',
  //     description:
  //       'UAE’s tax laws make it one of the most attractive locations to set up a company internationally. Free zones offer 100% exemption from personal and corporate taxes, no strings attached!',
  //   },
  //   {
  //     icon: Icons.Globe,
  //     title: 'Import And Export Duties Exemption',
  //     description:
  //       'The UAE exempts business owners from paying import and export duties while having no currency regulation restrictions. This flexibility in currency exchange makes doing international financial transactions much simpler allowing your business to conveniently expand its horizons!',
  //   },
  //   {
  //     icon: Icons.Person,
  //     title: 'Support From The Government',
  //     description:
  //       'The UAE government is supportive of new-age business owners and has created world-renowned infrastructure to help support their growth. The free zone authorities also assist new businesses in getting a free zone license to get their business off the ground.',
  //   },
  //   {
  //     icon: Icons.Like,
  //     title: 'dsfdsf',
  //     description: '',
  //   },
  //   {
  //     icon: Icons.Thought,
  //     title: 'dsfdsf',
  //     description: '',
  //   },
  // ]

  

  // const query = {
  //   graphQuery: `
  //     {
  //       generalpage {
  //         title
  //         slices {
  //           ...on description_quote {
  //             variation {
  //               ...on default {
  //                 primary {
  //                   title
  //                   description
  //                   quote

  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `
  // }
  // const page = await client.getByUID('generalpage', params.uid, query);
  // console.log("page")
  // console.log(page)

  // // page.data.

  // page.data.slices.map(slice => {
  //   console.log("****SLKICE&&&& " + slice.id)
  //   console.log(slice)
  // })

  const client = createClient()
  const page = await client
    .getByUID('servicepage', params.uid, {
      // fetchLinks: ["author", ],
    })
    .catch(() => notFound())
  console.log(page)

  return <SliceZone slices={page.data.slices} components={components} />
}

// export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
//   const client = createClient()
//   const page = await client.getByUID('generalpage', params.uid).catch(() => notFound())

//   return {
//     title: page.data.meta_title,
//     description: page.data.meta_description,
//   }
// }

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('generalpage')

  return pages.map((page) => {
    return { uid: page.uid }
  })
}
