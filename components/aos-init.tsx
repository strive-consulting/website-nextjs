'use client'

import { useEffect } from 'react'
// import AOS from 'aos'

export default function AosInit() {
  useEffect(() => {
    // AOS.init({
    //   once: true,
    //   disable: 'phone',
    //   duration: 600,
    //   easing: 'ease-out-sine',
    //   delay: 3000
    // })

    //Resolves animations required by components in Prismic slicezone
    import('aos').then((AOS) => {
      AOS.init({
        once: true,
        disable: 'phone',
        duration: 600,
        easing: 'ease-out-sine',
      })
    })
  })

  return <></>
}
