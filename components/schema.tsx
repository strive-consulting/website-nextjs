export interface ISchema {
  schemaJson?: any
}

const SchemaTag = ({ schemaJson }: ISchema) => {
  const schemaTag = schemaJson ? <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}></script> : <></>

  return schemaTag
}

export default SchemaTag
