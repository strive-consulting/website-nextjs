export interface ISchema {
  mainType?: string
  schemaJson?: Array<any>
}

const SchemaTag = ({ mainType = 'WebPage', schemaJson }: ISchema) => {
  const schemaOutput = {
    '@context': 'https://schema.org',
    '@type': mainType,
    mainEntity: schemaJson,
  }

  console.log(schemaOutput)

  const schemaTag = schemaJson ? (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOutput) }}
    ></script>
  ) : (
    <></>
  )

  return schemaTag
}

export default SchemaTag
