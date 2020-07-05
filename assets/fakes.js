import firstImg from "./templateImages/2.jpg"
import secontImg from "./templateImages/1.jpg"
import thirdImg from "./templateImages/3.jpg"
import fourthImg from "./templateImages/4.jpg"

const fakeDetails = {
    images: [
        firstImg,
        secontImg,
        thirdImg, 
        fourthImg,
    ],
    placeName: 'South University' ,
    description: 
        'Meet my family. There are five of us – my parents, my elder brother, my baby sister and me. ' + 
        'First, meet my mum and dad, Jane and Michael. My mum enjoys reading and my dad enjoys playing chess with ' + 
        'my brother Ken. My mum is slim and rather tall. She has long red hair and big brown eyes. She has a very ' + 
        'pleasant smile and a soft. Meet my family. There are five of us – my parents, my elder brother, my baby ' + 
        'sister and me. First, meet my mum and dad, Jane and Michael. My mum enjoys reading and my dad enjoys playing' + 
        'chess with my brother Ken. My mum is slim and rather tall. She has long red hair and big brown eyes. ' + 
        'She has a very pleasant smile and a soft and big surprize',
    visitCount: 1636,
    rating: 4
} 

const fakeComments = [
    { 
        text: 
            'Meet my family. There are five of us – my parents, my elder brother, my baby sister and me. ' +
            'First, meet my mum and dad, Jane and Michael. My mum enjoys reading and my dad enjoys playing chess with', 
        user: { 
            name: 'Artem Mironov', 
            avatar: 'https://www.iconninja.com/files/763/509/129/warrior-ninja-avatar-samurai-icon.png' 
        },
        rating: 5
    },
    { 
        text: 
            'Meet my family. There are five of us – my parents, my elder brother, my baby sister and me. ' +
            'First, meet my mum and dad, Jane and Michael. My mum enjoys reading and my dad enjoys playing chess with', 
        user: { 
            name: 'Artem Mironov', 
            avatar: 'https://www.iconninja.com/files/763/509/129/warrior-ninja-avatar-samurai-icon.png' 
        },
        rating: 2
    },
    { 
        text: 
            'Meet my family. There are five of us – my parents, my elder brother, my baby sister and me. ' +
            'First, meet my mum and dad, Jane and Michael. My mum enjoys reading and my dad enjoys playing chess with', 
        user: { 
            name: 'Artem Mironov', 
            avatar: 'https://www.iconninja.com/files/763/509/129/warrior-ninja-avatar-samurai-icon.png' 
        },
        rating: 4
    },
] 

  export { fakeDetails, fakeComments }