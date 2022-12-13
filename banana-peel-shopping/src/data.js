// import menFlops from './assets/menFlops.png';
// import womenFlops from './assets/womenFlops.png';
// import child1Flops from './assets/child1Flops.png';
// import child2Flops from './assets/child2Flops.png';

import slipper1_0 from './assets/item1/slipper1.0.png';
import slipper1_1 from './assets/item1/slipper1.1.png';
import slipper2_0 from './assets/item2/slipper2.0.png';
import slipper2_1 from './assets/item2/slipper2.1.png';
import slipper3_0 from './assets/item3/slipper3.0.png';
import slipper3_1 from './assets/item3/slipper3.1.png';
import slipper4_0 from './assets/item4/slipper4.0.png';
import slipper4_1 from './assets/item4/slipper4.1.png';

const flops = [
    {
      id: 1,
      title: 'LOOKIN LIKE A SNACK',
      status: false,
      checked: false,
      type: 'MEN',
      price: 15.99,
      qty: 0,
      img: [slipper1_0, slipper1_1],
      desc: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consequat a turpis non maximus. Praesent tincidunt vitae risus in maximus. Duis efficitur porta lorem vel dapibus. In sed justo sagittis, mollis diam eget, facilisis erat. `,
    },
    {
      id: 2,
      title: 'SLEIGHIN IT REEF SLIPPERS',
      status: false,
      checked: false,
      type: 'WOMEN',
      price: 13.99,
      qty: 0,
      img: [slipper2_0, slipper2_1],
      desc: `
      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ut varius metus. Mauris non ex fringilla, iaculis sem ac, fringilla nulla. Sed mattis blandit iaculis.`,
    },
    {
      id: 3,
      title: 'SANTA SHARK SLIPPERS',
      status: false,
      checked: false,
      type: 'KIDS',
      price: 6.99,
      qty: 0,
      img: [slipper3_0, slipper3_1],
      desc: `Suspendisse feugiat id velit non accumsan. Duis eu molestie arcu. Nunc eu mauris non magna molestie convallis vel tristique tortor. Aenean a est fringilla, pellentesque enim quis, rutrum quam`,
    },
    {
      id: 4,
      title: 'SANTA UNICORN SLIPPERS',
      status: false,
      checked: false,
      type: 'KIDS',
      price: 20.99,
      qty: 0,
      img: [slipper4_0, slipper4_1],
      desc: `Phasellus pellentesque odio elit, in semper ante bibendum eget. Sed et elit sed velit auctor scelerisque vehicula vel ipsum. Mauris tincidunt velit at magna maximus pulvinar. Suspendisse eu nunc sollicitudin, hendrerit ligula sed, convallis purus. `,
    },
    
  ];
  export default flops;