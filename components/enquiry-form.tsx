'use client'

// @ts-ignore
import JotFormReact from 'jotform-react'

export default function EnquiryForm() {
  return (
    // <JotFormReact
    //     formURL="https://form.jotform.com/232761834850359"
    //   />

    <JotFormReact
      formURL='https://form.jotform.com/232763029940357'
      autoResize={true}
      style={{ zIndex: 50000 }}
    />
  )
}

// import JotformEmbed from 'react-jotform-embed';

// export default function EnquiryForm() {
//   return (
//     <JotformEmbed src="https://form.jotformeu.com/232761834850359" />
//   )
// }
