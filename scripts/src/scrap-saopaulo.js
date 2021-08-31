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
    let farmacia = "Drogaria São Paulo";
    let nome = $(element).find(".collection-link").text();
    let preco = $(element).find(".valor-por").text();
    let urlproduto = $(element).find("a").attr("href");

    dados = { quando, farmacia, nome, preco, urlproduto };
    classmongo.add(dados);
  });
}

let totpgpai = 12;
let count = 1;

async function main() {
  while (count <= totpgpai) {
    const urlfilho = `https://www.drogariasaopaulo.com.br/buscapagina?fq=C%3a%2f800%2f&fq=specificationFilter_180%3aAnti-inflamat%c3%b3rios&PS=48&sl=727d3c85-e93a-42fd-bd7e-42dfd3978c22&cc=48&sm=0&PageNumber=${count}`;
    await scrap(urlfilho);
    count++;
  }
}

main();
