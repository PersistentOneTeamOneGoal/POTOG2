/* eslint-disable testing-library/await-async-utils */
/* eslint-disable testing-library/await-async-query */
import { cleanup, render, screen, waitFor, fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard.js';
import "@testing-library/jest-dom/extend-expect";

describe("Checks the Dashboard UI",()=>{
    afterEach(cleanup);

    it("has a quick looks button",async ()=>{
        render(<Dashboard />)

        fireEvent.mouseOver(screen.getByTestId("products-item1"));
        // eslint-disable-next-line testing-library/await-async-utils 
        waitFor(()=> expect(screen.getByTestId("look-btn")).toBeInTheDocument());
    })// passed

    it("has a cart button",()=>{
        render(<Dashboard />)
        const cart=screen.getByTestId("cart-btn");
        expect(cart).toBeInTheDocument();
    }) // passed

    it("checks for the product",()=>{
        render(<Dashboard />)
        const container=screen.getByTestId("products-container");
        expect(container).toBeInTheDocument();
    }) //passed

    it("checks first product in the dashboard",()=>{
        render(<Dashboard />)
        const proItem=screen.getByTestId("products-item1");
        expect(proItem).toBeTruthy();
    })

    it("checks all products in the dashboard",()=>{
        render(<Dashboard />)
        const proItem=screen.getAllByRole("products-item");
        expect(proItem).toBeTruthy();
        expect((proItem).length).toBe(4);
    }) // passed
     

    it("displays a modal with buttons", async ()=>{
        render(<Dashboard/>)
        fireEvent.mouseOver(screen.getByTestId("products-item1"));
        waitFor(()=> expect(screen.getByTestId("look-btn1")).toBeInTheDocument());
        fireEvent.click(screen.getByTestId('look-btn1'));
        // eslint-disable-next-line testing-library/await-async-utils
        waitFor(() => {
            const modal = screen.getByTestId("modal");
            waitFor(()=> expect(modal).toBeInTheDocument());
// expect(await screen.getByTestId("modal")).toHaveTextContent(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consequat a turpis non maximus. Praesent tincidunt vitae risus in maximus. Duis efficitur porta lorem vel dapibus. In sed justo sagittis, mollis diam eget, facilisis erat. `)
            const modalbuybtn = screen.getByTestId("buy-btn");
            waitFor(()=>expect(modalbuybtn).toBeInTheDocument());
        });
        
        
    
        
    }); 

    it("displays item description in the modal", ()=>{
        render(<Dashboard />)

        fireEvent.mouseOver(screen.getByTestId("products-item1"));
        waitFor(()=> expect(screen.getByTestId("look-btn1")).toBeInTheDocument());
        fireEvent.click(screen.getByTestId('look-btn1'));
        expect(screen.getByTestId("modal")).toBeInTheDocument();
        expect(screen.getByTestId("modal")).toHaveTextContent(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consequat a turpis non maximus. Praesent tincidunt vitae risus in maximus. Duis efficitur porta lorem vel dapibus. In sed justo sagittis, mollis diam eget, facilisis erat. `)
    })
    // it("has products in the dashboard",()=>{
    //     render(<Dashboard />)

        
    // })

    // it("has a buy button", ()=>{
    //     render(<Dashboard />)
    //     const buy =screen.getByTestId("buy-btn", {name: /BUY/i,hidden:true });
    //     expect(buy).toHaveClass(buyItem);
    // }) //not sure how to test hidden buttons

    // it("Checks the number of products in the dashboard",()=>{
    //     render(<Dashboard />)
    //     expect(screen.findByText('bohemian dreams - light red')).toBeInTheDocument();
    //     expect(screen.getByTestId('prodcuts').length).toBe(4);
    // }) //not sure pako ani

    // it("has a buy button",()=>{
    //     render(<Dashboard />)
    //     const buy=screen.getByTestId("buy-btn");
    //     expect(buy).toBeInTheDocument();
    // })
})