const rp = require('request-promise');
const cheerio = require('cheerio');



const options = {
  uri: `http://www.comiendopipas.com/Agenda.aspx`,
  transform: function(body) {
    return cheerio.load(body);
  }
};

var texto = "";
var textazo = "";
var todo = [];

var tipo = [];
var titulos = [];
var lugar = [];
var descripcion = [];




rp(options)
  .then(($) => {

    $('.ResultadosDivRight').each(function(i, elem) {
      tipo.push(($(this).children().first().text()));

    });

    $('.ResultadosTitulo').each(function(i, elem) {
      titulos.push(($(this).text()));
    });

    $('div[style="display:block;width: -moz-calc(100% - 90px);width: -webkit-calc(100% - 90px);width: calc(100% - 90px);float: left;"]').each(function(i, elem) {
      lugar.push(($(this).children().first().text()));
    });

    $('.ResultadosDescripcion').each(function(i, elem) {
      descripcion.push(($(this).text()));
    });


    for (var j = 0; j < titulos.length; j++) {
      texto += "Tipo: " + tipo[j] + "\n";
      texto += "Titulo: " + titulos[j] + "\n";
      texto += "Lugar: " + lugar[j] + "\n";
      texto += "Descripcion: " + descripcion[j] + "\n";
      texto += "\n" ;
      todo.push(texto);
      texto = "";
    
    }
    
    
    for(var n=0;n<todo.length;n++){
      textazo += todo[n];
    }
    
   
    

  })
  .catch((err) => {
    console.log(err);
  });





const Telegraf = require('telegraf')
const bot = new Telegraf("485539066:AAGkzmUVw4CDCfDsd9gc-qfeE14Q-4ggqss")


bot.start((ctx) => {
  console.log('started:', ctx.from.id)
  return ctx.reply('Conoce todo tipo de activadades realizables en Madrid para hoy. Para hacerlo solo tienes que enviar el comando /todo. Have fun!.')
})



bot.command('help', (ctx) => ctx.reply('Usa /todo para ver las actividades!'));
bot.hears('/todo', (ctx) => ctx.reply(textazo));





bot.startPolling()
