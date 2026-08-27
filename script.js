const abas=document.querySelectorAll('.abas button');
const personagens=document.querySelectorAll('.personagem');
abas.forEach(aba=>{aba.addEventListener('click',()=>{const id=aba.dataset.personagem;abas.forEach(a=>a.classList.remove('ativa'));personagens.forEach(p=>p.classList.remove('ativo'));aba.classList.add('ativa');document.getElementById(id).classList.add('ativo')})});

// Carrega automaticamente imagens dos Chapéus de Palha.
// A API Jikan fornece imagens públicas associadas aos personagens de One Piece.
const nomesImagem = {
  luffy: 'Monkey D. Luffy',
  zoro: 'Roronoa Zoro',
  nami: 'Nami',
  usopp: 'Usopp',
  sanji: 'Sanji',
  chopper: 'Tony Tony Chopper',
  robin: 'Nico Robin',
  franky: 'Franky',
  brook: 'Brook',
  jinbe: 'Jinbe'
};

async function carregarImagensOnePiece(){
  try {
    const resposta = await fetch('https://api.jikan.moe/v4/anime/21/characters');
    if(!resposta.ok) throw new Error('Não foi possível carregar as imagens.');
    const dados = await resposta.json();

    const personagensApi = new Map(
      dados.data.map(item => [item.character.name.toLowerCase(), item.character.images?.jpg?.image_url])
    );

    document.querySelectorAll('.membro img').forEach(img => {
      const chave = Object.keys(nomesImagem).find(k => img.alt.toLowerCase() === k);
      if(!chave) return;
      const nome = nomesImagem[chave].toLowerCase();
      const url = personagensApi.get(nome);
      if(url) img.src = url;
    });
  } catch(erro) {
    console.warn('Imagens dos personagens não puderam ser carregadas:', erro);
  }
}

const imagensGaleria = {
  tripulacao: 'https://www.weareplaystation.fr/api/upload/media/post/0004/58/36ff9950cc670ca5e6b770375ba58762e9fb829d.jpg',
  sunny: 'https://www.pinterest.com/pin/711709547362022998/',
  oda: 'https://www.mangaspace.fr/wp-content/uploads/2025/09/Eiichiro-Oda-parcours-manga-et-distinctions-1.jpg'
};

// Imagens fixas para as áreas que não são personagens.
const tripulacao = document.querySelector('img[src="images/tripulacao.jpg"]');
if(tripulacao) tripulacao.src = imagensGaleria.tripulacao;

const oda = document.querySelector('img[src="images/oda.jpg"]');
if(oda) oda.src = imagensGaleria.oda;

const toei = document.querySelector('img[src="images/toei.jpg"]');
if(toei) toei.src = imagensGaleria.tripulacao;

const momentos = document.querySelectorAll('.momento img');
const imagensMomentos = [
  imagensGaleria.tripulacao,
  'https://www.slashfilm.com/img/gallery/the-correct-order-to-watch-one-piece-including-the-movies/intro-1724688902.jpg',
  'https://www.weareplaystation.fr/api/upload/media/post/0004/58/36ff9950cc670ca5e6b770375ba58762e9fb829d.jpg',
  'https://wall.alphacoders.com/big.php?i=911401'
];
momentos.forEach((img,index)=>{if(imagensMomentos[index]) img.src=imagensMomentos[index];});

const artes = document.querySelectorAll('.foto img');
artes.forEach((img,index)=>{
  img.src = index === 0 ? imagensGaleria.tripulacao : index === 1 ? imagensGaleria.oda : imagensGaleria.tripulacao;
});

carregarImagensOnePiece();
