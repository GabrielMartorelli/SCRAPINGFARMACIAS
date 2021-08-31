const axios = require("axios");
const cheerio = require("cheerio");
const UserAgent = require("user-agents");
const time = require("./mod/time");
const classmongo = require("./mod/classmongo");

let dados = {};

async function scrap(url) {
  const horadata = time();
  await classmongo.start();
  const userAgent = await new UserAgent();
  const { data } = await axios.get(url, {
    "User-Agent": userAgent.toString(),
  });
  const $ = cheerio.load(data);
  $(".descricao-prateleira").map((index, element) => {
    let quando = horadata;
    let farmacia = "Drogaria Pacheco";
    let nome = $(element).find(".collection-link").text();
    let preco = $(element).find(".valor-por").text();
    let urlproduto = $(element).find("a").attr("href");

    dados = { quando, farmacia, nome, preco, urlproduto };
    classmongo.add(dados);
  });
}

let totpgpai = 13;
let count = 1;

async function main() {
  while (count <= totpgpai) {
    const urlfilho = `https://www.drogariaspacheco.com.br/buscapagina?fq=C%3a%2f800%2f&fq=specificationFilter_146%3aAnti-inflamat%c3%b3rios&PS=48&sl=d3e0ddd8-cb3d-47a5-b619-6747a06b74ce&cc=48&sm=0&PageNumber=${count}`;
    await scrap(urlfilho);
    count++;
  }
}

main();
