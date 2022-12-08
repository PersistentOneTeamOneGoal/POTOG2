import menFlops from './assets/menFlops.png';
import womenFlops from './assets/womenFlops.png';
import child1Flops from './assets/child1Flops.png'
import child2Flops from './assets/child2Flops.png'

const flops = [
    {
      id: 1,
      title: 'yonder - dispotic',
      status:false,
      type: 'MEN',
      price: 15.99,
      qty: 0,
      img: menFlops,
      desc: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consequat a turpis non maximus. Praesent tincidunt vitae risus in maximus. Duis efficitur porta lorem vel dapibus. In sed justo sagittis, mollis diam eget, facilisis erat. `,
    },
    {
      id: 2,
      title: 'bohemian dreams - red',
      status:false,
      type: 'WOMEN',
      price: 13.99,
      qty: 0,
      img: womenFlops,
      desc: `
      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ut varius metus. Mauris non ex fringilla, iaculis sem ac, fringilla nulla. Sed mattis blandit iaculis.`,
    },
    {
      id: 3,
      title: 'hopscotch - pool blue',
      status:false,
      type: 'KIDS',
      price: 6.99,
      qty: 0,
      img: child1Flops,
      desc: `Suspendisse feugiat id velit non accumsan. Duis eu molestie arcu. Nunc eu mauris non magna molestie convallis vel tristique tortor. Aenean a est fringilla, pellentesque enim quis, rutrum quam`,
    },
    {
      id: 4,
      title: 'portobello - beary cute',
      status:false,
      type: 'KIDS',
      price: 20.99,
      qty: 0,
      img: child2Flops,
      desc: `Phasellus pellentesque odio elit, in semper ante bibendum eget. Sed et elit sed velit auctor scelerisque vehicula vel ipsum. Mauris tincidunt velit at magna maximus pulvinar. Suspendisse eu nunc sollicitudin, hendrerit ligula sed, convallis purus. `,
    },
    
  ];
  export default flops;