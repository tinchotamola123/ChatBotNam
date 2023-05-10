const { createBot, createProvider, createFlow, addKeyword, addAnswer } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

/*const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a Ñam*')
    .addAnswer(
        [
            'En que te podemos ayudar?',
            '👉 Escribi *Menu* para ver la carta',
            '👉 Escribi ** ',
            '👉 *discord*',
        ],
        null,
        null,
        []
    )
*/

const flujoDelivery = addKeyword("A").addAnswer("Ahora en *Ñam*, podes pedir directamente desde nuestra web: \n https://nam-gourmet.com/ \nEs muy fácil!. \nSimplemente, elegi tus productos favoritos, la opción de entrega. \n(Entrega a domicilio/Para retirar), el medio de pago y LISTO. ")

const flujoMostrador = addKeyword("B").addAnswer("Llamanos y lo podes venir a retirar a la calle Perito Moreno 2500 ")

const flujoPrincipal = addKeyword(['Hola','Buenas','Holi','Buenas noches','Holiii']).addAnswer('Buenas noches, gracias por comunicarte con *ÑAM* 🍔🍟 \n \nComo podemos ayudarte? \nPor favor,elige entre una de las siguientes opciones,seleccionando la letra correspondiente: \n  *A* Delivery 🛵 \n  *B* Mostrador 🏚', { capture:true },null,[flujoDelivery, flujoMostrador])

const flujoAlias = addKeyword(['mercado pago','alias','pago']).addAnswer('El alias nuestro es: 💵 \nñam.godoy.cruz \nUna vez realizada la transferencia mandanos el comprobante. Gracias.')
.addAnswer("En unos 45 min estamos por ahi.")

const flujoAdios = addKeyword(['gracias','adios','chau']).addAnswer('Chau. Gracias por confiar en Ñam😎')

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flujoPrincipal,flujoAlias,flujoAdios])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
