var PARSED = JSON.parse(inputData.RawJson) //Received via PandaDoc webhook
var DOCUMENT = PARSED[0] //Note, Zapier seems to parse the object and wrap it in to an array

var validTemplateId = '8rXXNBxdbYXKtiKLzQXpa6' //main quoting template which document needs to be based off
var templateId = DOCUMENT.data.template.id
var documentId = DOCUMENT.data.id
var status = DOCUMENT.data.status
var recipientName = DOCUMENT.data.recipients[0].first_name + ' ' + DOCUMENT.data.recipients[0].last_name
var recipientEmail = DOCUMENT.data.recipients[0].email
var dateSent = DOCUMENT.data.date_created
var quoteRef = DOCUMENT.data.autonumbering_sequence_name

var pricingTablesArr = DOCUMENT.data.pricing.tables

var invoice1items = []
var invoice2items = []
var invoice3items = []

if (templateId === validTemplateId) {
  for (var i = 0; i < pricingTablesArr.length; i++) {
    var tableName = pricingTablesArr[i].name //Phase1, Phase2 etc
    var items = pricingTablesArr[i].items

    for (var x = 0; x < items.length; x++) {
      //Note, all items have the 'option' property
      var options = items[x].options

      if (options && options.optional) {
        //If its option, ensure it is checked
        if (options.optional && options.optional_selected) {
          //Add
          if (tableName === 'Phase1') {
            invoice1items.push({
              sku: items[x].sku,
              description: items[x].name,
              qty: items[x].qty,
              price: items[x].price,
            })
          }
          if (tableName === 'Phase2') {
            invoice2items.push({
              sku: items[x].sku,
              description: items[x].name,
              qty: items[x].qty,
              price: items[x].price,
            })
          }
          if (tableName === 'Phase3') {
            invoice3items.push({
              sku: items[x].sku,
              description: items[x].name,
              qty: items[x].qty,
              price: items[x].price,
            })
          }
        }
      } else {
        //standard item so add to our response array
        if (tableName === 'Phase1') {
          invoice1items.push({
            sku: items[x].sku,
            description: items[x].name,
            qty: items[x].qty,
            price: items[x].price,
          })
        }
        if (tableName === 'Phase2') {
          invoice2items.push({
            sku: items[x].sku,
            description: items[x].name,
            qty: items[x].qty,
            price: items[x].price,
          })
        }
        if (tableName === 'Phase3') {
          invoice3items.push({
            sku: items[x].sku,
            description: items[x].name,
            qty: items[x].qty,
            price: items[x].price,
          })
        }
      }
    }
  }

  //Output
  //Summary data
  //Block for each pricing table to correlate to each invoice to be created
  var response = {
    documentId: documentId,
    quoteRef: quoteRef,
    recipientName: recipientName,
    recipientEmail: recipientEmail,
    dateSent: dateSent,
    invoice1Create: invoice1items.length > 0,
    invoice1items: invoice1items,
    invoice2Create: invoice2items.length > 0,
    invoice2items: invoice2items,
    invoice3Create: invoice3items.length > 0,
    invoice3items: invoice3items,
  }

  output = { response }
} else {
  var response = {
    error: 'PandaDoc document from unsupported template',
    invoice1Create: invoice1items.length > 0,
    invoice1items: invoice1items,
    invoice2Create: invoice2items.length > 0,
    invoice2items: invoice2items,
    invoice3Create: invoice3items.length > 0,
    invoice3items: invoice3items,
  }

  output = { response }
}
